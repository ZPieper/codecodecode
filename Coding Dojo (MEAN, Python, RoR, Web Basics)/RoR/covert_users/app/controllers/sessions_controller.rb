class SessionsController < ApplicationController

	skip_before_action :require_login, except: [:destroy]

  def new

  end

  def create
  	user = User.find_by_email(params[:email])
  	if user
  		if user.try(:authenticate, params[:password])
  			session[:user_id] = user.id
  			redirect_to "/users/" + session[:user_id].to_s
  		else
  			flash[:alert] = ["Invalid Combination"]
  			redirect_to :back
  		end
  	else
  		flash[:alert] = ["Invalid Combination"]
  		redirect_to :back
  	end
  end

  def destroy
  	session[:user_id] = nil
  	redirect_to "/sessions/new"
  end
end
