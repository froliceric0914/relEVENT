

  class UserEventsController < ApplicationController

    def create
      user_events = UsersEvent.create(
        user_id: current_user,
        event_id: params[:event_id],
        bookmarked: params[:bookmarked],
        liked: params[:liked]
      )
      if user_events
        render json: user_events
      else
        head :unprocessable_entity
        # render json: {message: "entry already exists"}
      end
    end

    def events 
      # this finds the users events
      user_events = UsersEvent.where(
        user_id: params[:user_id]
      )
      # this pulls out the event id's into an array
      filtered_user_events = user_events.map{|i| i.event_id}
      # return found events to the client
      render json: Event.find(filtered_user_events)
    end

    def destroy
      user_events = UsersEvent.where('user_id = ? AND event_id = ?', params[:user_id], params[:id])
      # destory needs an ID to delete 
      UsersEvent.destroy(user_events.first.id)
      # UsersEvent.where(user_id: params[:user_id], event_id: params[:event_id]).destroy_all
    end
  end



