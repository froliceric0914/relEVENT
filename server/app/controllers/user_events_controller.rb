

  class UserEventsController < ApplicationController

    def create
      puts "here!"

      @category = Category.first
    
      @event = Event.find_by(
        external_event_id: params[:event_id], 
      ) || Event.create!(
        external_event_id: params[:event_id], 
        like_count: 0, 
        category: @category
      )

      @user = User.find_by!(id: params[:user_id])

      user_events = UsersEvent.create!(
        user_id: @user.id,
        event_id: @event.id,
        bookmarked: params[:bookmarked],
        liked: params[:liked]
      )
      # byebug

      if user_events
        render json: user_events
      else
        head :unprocessable_entity
        # render json: {message: "entry already exists"}
      end
    end

    def update
      @event = Event.find_by(
        external_event_id: params[:event_id], 
      )
      user_events = UsersEvent.find_by(user_id: params[:user_id], event_id: @event.id)
      user_events.update(bookmarked: params[:bookmarked],
      liked: params[:liked])

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

      @event = Event.find_by!(external_event_id: params[:id])

      user_events = UsersEvent.where('user_id = ? AND event_id = ?', params[:user_id], @event.id)
      # destory needs an ID to delete 
      UsersEvent.destroy(user_events.first.id)
      # UsersEvent.where(user_id: params[:user_id], event_id: params[:event_id]).destroy_all
    end
  end



