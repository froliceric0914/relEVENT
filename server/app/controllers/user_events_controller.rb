

  class UserEventsController < ApplicationController

    def create
      user_events = UsersEvent.create(
        user: current_user,
        event_id: params[:event_id],
        bookmarked: params[:bookmarked],
        liked: params[:liked]
      )
  
      if user_events
        render json: user_events
      else
        head :unprocessable_entity
      end
    end
  end



