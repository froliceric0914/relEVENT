class UserEventsController < ApplicationController

    # handle create, edit, destroy in this route
    def update 
      
      @category = Category.first

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

      if user_event

        if params[:selected] == "like"
          user_event.update(
          liked: !user_event[:liked])
        else
          user_event.update(bookmarked: !user_event[:bookmarked],
          )
        end

        if user_event[:bookmarked] == false && user_event[:liked] == false
          UsersEvent.destroy(user_event.id)
        end

      else
        
        # create user
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
      ).order('id DESC')
      render json: user_events_list
      
    end  

    def events 

      user_events = UsersEvent.where(
        user_id: params[:user_id]
      ).order('id DESC')
  
      render json: user_events
    end

  end



