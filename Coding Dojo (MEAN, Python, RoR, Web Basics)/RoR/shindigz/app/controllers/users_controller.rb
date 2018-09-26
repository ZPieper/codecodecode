class UsersController < ApplicationController

	skip_before_action :require_login, except: [:edit_user, :edit_user_form, :logout]
	before_action :check_id, only: [:edit_user, :edit_user_form]

	def index
		
	end

	def new_user
		user = User.create(user_params)

  		if user.valid?
  			flash[:alert] = ["Successfully registered!"]
  			redirect_to '/'
  		end

  		if user.valid? == false
  			redirect_to '/', alert: user.errors.full_messages
  		end
	end

	def login
		user = User.find_by_email(params[:email])
  		if user
  			if user.try(:authenticate, params[:password])
  				session[:user_id] = user.id
  				redirect_to '/events'
  			else
  				flash[:alert] = ["Invalid Combination for Login"]
  				redirect_to '/'
  			end
  		else
  			flash[:alert] = ["Invalid Combination for Login"]
  			redirect_to '/'
  		end
	end

	def edit
		@user = User.find( session[:user_id] )
	end

	def edit_user
		number = params[:id]
  		user = User.find( number )
  		user.update(user_params)
  		redirect_to '/events' if user.valid?

  		if (user.valid? == false)
  			redirect_to :back, alert: user.errors.full_messages
  		end
	end

	def logout
		session[:user_id] = nil
  	redirect_to '/'
	end

  def delete
    user = User.find( session[:user_id] )

    if (user && (params[:id] == user.id.to_s))
      user.destroy
      flash[:alert] = ["Successfully deleted your account!"]
      session[:user_id] = nil
      redirect_to '/'
    else
      flash[:alert] = ["Cannot delete a user that isn't you!"]
      redirect_to '/user/' + session[:user_id].to_s
    end
  end

	private

	def user_params
  		params.require(:user).permit(:first_name, :last_name, :city, :state, :email, :password, :password_confirmation)
  	end

  	def check_id
  		redirect_to '/user/' + session[:user_id].to_s if session[:user_id].to_s != params[:id]
  	end

end
