class ChatChannel < ApplicationCable::Channel
  def subscribed
    puts 'SUBSCRIBING?'
    stream_from 'chat_channel'
  end

  def unsubscribed; end

  def create(opts)

    @category = Category.first
    
    event = Event.find_by(
      external_event_id: opts.fetch('event_id'), 
    ) || Event.create!(
      external_event_id: opts.fetch('event_id'), 
      like_count: 0, 
      name: opts.fetch('event_name'),
      logo_url: opts.fetch('img_url'),
      category: @category
    )

    user = User.find_by!(id: opts.fetch('user_id'))
    
    if event
      test = Message.create(
        content: opts.fetch('content'),
        user_id: user.id,
        event_id: event.id
      )
    end

  end
end
