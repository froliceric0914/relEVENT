class MessagesController < ApplicationController
  def index
    @event = Event.find_by(external_event_id: params[:event_id])
    @messages = Message.where(event_id: @event )
    render json: @messages, status: :ok
  end

  def create
    @event = Event.find params[:event_id]
    @message = @event.messages.create(message_params.content)
    render json: @message, status: :created
  end

  private

  def message_params
    params.require(:message).permit(:user_id, :content)
  end

end
