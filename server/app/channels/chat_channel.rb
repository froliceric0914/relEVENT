class ChatChannel < ApplicationCable::Channel
  def subscribed
    puts 'SUBSCRIBING?'
    stream_from 'chat_channel'
  end

  def unsubscribed; end

  def create(opts)
    Message.create(
      content: opts.fetch('content'),
      event_id: 1,
      user_id: 1
    )
  end
end
