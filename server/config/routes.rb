Rails.application.routes.draw do

  mount ActionCable.server => '/cable'

  resources :users do
    resources :user_events
  end

  resources :events, only: [:show, :index] do
    resources :messages, only: [:index, :create]
  end

  get '/users/:user_id/events' => 'user_events#events'
  put '/users/:user_id/remove/:event_id' => 'user_events#remove'

    # these routes are for showing users a login form, logging them in, and logging them out.
    get '/login' => 'sessions#new'
    post '/login' => 'sessions#create'
    get '/logout' => 'sessions#destroy'
       # These routes will be for signup. The first renders a form in the browse, the second will
       # receive the form and create a user in our database using the data given to us by the user.
     get '/signup' => 'users#new'
     post '/users' => 'users#create'

end
