class SecretsController < ApplicationController

  def index
  	@secrets = Secret.all
  	current_user = current_user
  end

  def create
  	secret = Secret.create(secret_params)

  	redirect_to '/users/' + session[:user_id].to_s  if secret.valid?

  	if (secret.valid? == false)
  		redirect_to :back, alert: secret.errors.full_messages
  	end
  end

  def destroy
  	number = params[:id]
  	secret = Secret.find( number )
  	if (session[:user_id] == secret.user_id)
  		secret = Secret.destroy( number )
  		redirect_to '/users/' + session[:user_id].to_s
  	else
  		session[:user_id] = nil
  		flash[:alert] = ["Cannot delete someone else's secret, please login again"]
  		redirect_to '/sessions/new'
  	end
  end

  private

  def secret_params
  	params.require(:secret).permit(:content, :user_id)
  end
end
