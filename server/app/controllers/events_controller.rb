class EventsController < ApplicationController
  
  def index
    # @events = Event.all.order(created_at: :desc)
    # this needs to return all the events and their information
    puts "Here are the events"
    @events = Event.all
    render json: @events, status: :ok
  end

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
