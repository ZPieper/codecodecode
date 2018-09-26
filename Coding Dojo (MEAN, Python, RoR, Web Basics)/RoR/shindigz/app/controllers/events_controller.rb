class EventsController < ApplicationController

	def index
		@user = User.find( session[:user_id] )
		@instates = Event.where(state: @user.state).includes(:user, :attendees).sort_by { |s| s[:city] }
		@outstates = Event.where.not(state: @user.state).includes(:user, :attendees).sort_by { |s| s[:state] }
	end

	def create
		event = Event.create(event_params)

  		if event.valid?
  			flash[:alert] = ["Successfully made an event!"]
  			redirect_to '/events'
  		end

  		if event.valid? == false
  			redirect_to '/events', alert: event.errors.full_messages
  		end
	end

	def join
		event = Event.find( params[:id] )
		user = User.find( session[:user_id] )
		existing_attend = Attend.where(event_id: params[:id], user_id: session[:user_id])

		if ((event.user_id != user.id) && existing_attend.empty?)
			attend = Attend.create(event_id: params[:id], user_id: session[:user_id])

  			if attend.valid?
  				flash[:notice] = ["Successfully attended an event!"]
  				redirect_to '/events'
  			end

  		else
  			flash[:notice] = ["Cannot attend event you have created or are already attending."]
  			redirect_to '/events'
  		end
	end

	def unjoin
		event = Event.find( params[:id] )
		user = User.find( session[:user_id] )
		existing_attend = Attend.where(event_id: params[:id], user_id: session[:user_id])

		if ((event.user_id != user.id) && existing_attend.any?)
			attend = Attend.where(event_id: params[:id], user_id: session[:user_id]).destroy_all
  			flash[:notice] = ["Successfully unattended an event!"]
  			redirect_to '/events'

  		else
  			flash[:notice] = ["Cannot unattend event you have created or are already not attending."]
  			redirect_to '/events'
  		end
	end

	def delete
		event = Event.find( params[:id] )
		user = User.find( session[:user_id] )
		existing_event = Event.where(id: params[:id], user_id: session[:user_id])

		if ((event.user_id == user.id) && existing_event)
			attend = Event.where(id: params[:id], user_id: session[:user_id]).destroy_all
  			flash[:notice] = ["Successfully deleted an event!"]
  			redirect_to '/events'

  		else
  			flash[:notice] = ["Cannot delete event you have not created or does not exist."]
  			redirect_to '/events'
  		end
	end

	def show
		@event = Event.find( params[:id] )
		@user = User.find( session[:user_id] )
		@people_coming = @event.attendees.sort_by { |s| s[:first_name] }
		@host = @event.user.first_name + " " + @event.user.last_name
		@comments = Comment.where( event_id: params[:id] ).includes(:user)
	end

	def edit
		event = Event.find( params[:id] )
		user = User.find( session[:user_id] )
		if ((event.user_id == user.id) && event)
			@event = Event.find( params[:id] )
			@user = User.find( session[:user_id] )
		else
			flash[:notice] = ["Cannot edit event you have not created or does not exist."]
  			redirect_to '/events'
  		end
	end

	def edit_event
		event = Event.find( params[:id] )
		user = User.find( session[:user_id] )
		if ((event.user_id == user.id) && event)
			up_event = event.update( event_params )

			if up_event
				flash[:notice] = ["Successfully updated an event!"]
				redirect_to '/events'
			else
  				redirect_to :back, alert: event.errors.full_messages
  			end
		else
			flash[:notice] = ["Cannot edit event you have not created or does not exist."]
  			redirect_to '/events'
  		end
	end

	def add_comment
		comment = Comment.create(comment_params)
		event = Event.find( params[:id] )

		if comment.valid?
  			redirect_to '/events/' + event.id.to_s
  		end

  		if comment.valid? == false
  			redirect_to '/events/' + event.id.to_s, alert: comment.errors.full_messages
  		end
	end

	private

	def event_params
  		params.require(:event).permit(:name, :date, :city, :state).merge(user_id: session[:user_id])
  	end

  	def comment_params
  		params.require(:comment).permit(:content).merge(user_id: session[:user_id], event_id: params[:id].to_i)
  	end

end
