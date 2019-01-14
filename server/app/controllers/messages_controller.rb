class MessagesController < ApplicationController
  
  def index
    @event = Event.find_by(external_event_id: params[:event_id])
    @messages = Message.where(event_id: @event ).order('id')
    render json: @messages, status: :ok
  end

end
