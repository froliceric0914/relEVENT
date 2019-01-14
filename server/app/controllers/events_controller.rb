class EventsController < ApplicationController
  
  def index
    @events = Event.all
    render json: @events, status: :ok
  end

  # def create 
  #   # if this user already has this event give another response  # Event.where(admin: true).exists?
  #   user = User.find params[:user_id]
  #   event = Event.find params[:event_id]
  #   user.events.push event
  #   user.save
  #   render json: user, status: :ok
  # end

  def show 
    @event = Event.find params[:id]
    render json: @event, status: :ok
  end

  # def show
  #   puts "in detail"
  #   puts params["id"]
  #   @event = Event.find params[:id]
  #   render json: @event, status: :ok
  # end

end
