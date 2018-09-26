class LikesController < ApplicationController

  def like
  	like = Like.create(like_params)

  	redirect_to '/secrets' # if like.valid?

  	#if (like.valid? == false)
  	#	redirect_to :back, alert: like.errors.full_messages
  	#end
  end

  def unlike
  	number = params[:id]
  	secret = Secret.find( number )
  	user = User.find( session[:user_id] )
  	like = Like.where({user_id: user.id, secret_id: secret.id})
  	if (like)
  		like = Like.where({user_id: user.id, secret_id: secret}).destroy_all
  		redirect_to '/secrets'
  	else
  		session[:user_id] = nil
  		flash[:alert] = ["Cannot delete someone else's like, please login again"] 
  		redirect_to '/sessions/new'

  	end
  end

  private

  def like_params
  	params.require(:like).permit(:secret_id, :user_id)
  end

end
