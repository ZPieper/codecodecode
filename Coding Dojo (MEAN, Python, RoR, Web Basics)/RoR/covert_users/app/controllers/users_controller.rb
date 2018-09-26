class UsersController < ApplicationController

	skip_before_action :require_login, only: [:new, :new_user]
	before_action :check_id, except: [:new, :new_user]

  def new

  end

  def new_user
  	user = User.create(user_params)

  	redirect_to '/sessions/new'  if user.valid?

  	if (user.valid? == false)
  		redirect_to :back, alert: user.errors.full_messages
  	end
  end

  def edit
  	current_user = current_user
  end

  def edit_user
  	number = params[:id]
  	user = User.find( number )
  	user.update(user_params)
  	redirect_to '/users/' + session[:user_id].to_s if user.valid?

  	if (user.valid? == false)
  		redirect_to :back, alert: user.errors.full_messages
  	end
  end

  def delete
  	number = params[:id]
  	user = User.destroy( number )
  	session[:user_id] = nil
  	redirect_to '/users/new'
  end

  def info
  	current_user = current_user
  	@secrets = Secret.all
  end

  private

  def user_params
  	params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def check_id
  	redirect_to '/users/' + session[:user_id].to_s if session[:user_id].to_s != params[:id]
  end
end
