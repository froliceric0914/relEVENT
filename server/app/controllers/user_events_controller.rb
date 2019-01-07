

  class UserEventsController < ApplicationController

    # no use. use put for all icon click transaction
    # def create
    #   puts "here!"

    #   # currently no use, so just assign first one 
    #   @category = Category.first
    
    #   @event = Event.find_by(
    #     external_event_id: params[:event_id], 
    #   ) || Event.create!(
    #     external_event_id: params[:event_id], 
    #     like_count: 0, 
    #     name: params[:event_name],
    #     logo_url: params[:img_url],
    #     category: @category
    #   )

    #   @user = User.find_by!(id: params[:user_id])

    #   user_event = UsersEvent.create!(
    #     user_id: @user.id,
    #     event_id: @event.id,
    #     bookmarked: params[:bookmarked],
    #     liked: params[:liked]
    #   )

    #   # if user_event
    #   #   render json: user_event
    #   # else
    #   #   head :unprocessable_entity
    #   #   # render json: {message: "entry already exists"}
    #   # end
    # end

    def update

      # @event = Event.find_by(
      #   external_event_id: params[:event_id], 
      # )
      # user_events = UsersEvent.find_by(user_id: params[:user_id], event_id: @event.id)
      # user_events.update(bookmarked: params[:bookmarked],
      # liked: params[:liked])

      # user_events_list = UsersEvent.where(
      #   user_id: params[:user_id]
      # )
      # render json: user_events_list

      @category = Category.first
      # byebug
      @event = Event.find_by(
        external_event_id: params[:event_id], 
      ) || Event.create!(
        external_event_id: params[:event_id], 
        like_count: 0, 
        name: params[:event_name],
        logo_url: params[:img_url],
        category: @category
      )

      user_event = UsersEvent.find_by(user_id: params[:user_id], event_id: @event.id)
#  byebug
      if user_event

        # put
        if params[:selected] == "like"
          user_event.update(
          liked: !user_event[:liked])
        else
          user_event.update(bookmarked: !user_event[:bookmarked],
          )
        end

        #delete
        if user_event[:bookmarked] == false && user_event[:liked] == false
          UsersEvent.destroy(user_event.id)
        end

      else
        # create
        @user = User.find_by!(id: params[:user_id])

        user_event = UsersEvent.create!(
          user_id: @user.id,
          event_id: @event.id,
          bookmarked: params[:bookmarked],
          liked: params[:liked]
        )

      end

      user_events_list = UsersEvent.where(
        user_id: params[:user_id]
      )
      render json: user_events_list
      
    end  

    def events 
      # this finds the users events
      user_events = UsersEvent.where(
        user_id: params[:user_id]
      )

      # if you need to get events matched
      # =====================================
      # # this pulls out the event id's into an array
      # filtered_user_events = user_events.map{|i| i.event_id}
      # # return found events to the client
      # render json: Event.find(filtered_user_events)
      # =====================================
  
      render json: user_events
    end

    # to send back json, switched to use this route from destloy 
    def remove

      @event = Event.find_by!(external_event_id: params[:id])

      user_events = UsersEvent.where('user_id = ? AND event_id = ?', params[:user_id], @event.id)
      # destory needs an ID to delete 
      UsersEvent.destroy(user_events.first.id)

      user_events = UsersEvent.where(
        user_id: params[:user_id]
      )
      render json: user_events

    end

    # currently no use since this return 204 with no data
    def destroy

      @event = Event.find_by!(external_event_id: params[:id])

      user_events = UsersEvent.where('user_id = ? AND event_id = ?', params[:user_id], @event.id)
      # destory needs an ID to delete 
      UsersEvent.destroy(user_events.first.id)
      # UsersEvent.where(user_id: params[:user_id], event_id: params[:event_id]).destroy_all
      
      # user_events = UsersEvent.where(
      #   user_id: params[:user_id]
      # )
      # render json: user_events

    end
  end



