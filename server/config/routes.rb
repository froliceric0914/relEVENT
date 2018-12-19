Rails.application.routes.draw do
  
  # changed this to add show
  resources :users do 
    resources :events, only: [:index, :show]
  end

  # resources :events
  # get '/events' => 'events#index'
  # get '/events/:id' => 'events#show'
  # post '/events' => 'events#create'
  # put '/events/:id' => 'events#update'
  # delete '/events/:id' => 'events#delete'

  resources :events, only: [:show, :index] do
    resources :messages, only: [:index, :create]
  end


end

  #  # these routes are for showing users a login form, logging them in, and logging them out.
  #  get '/login' => 'sessions#new'
  #  post '/login' => 'sessions#create'
  #  get '/logout' => 'sessions#destroy'
  #     # These routes will be for signup. The first renders a form in the browse, the second will 
  #   # receive the form and create a user in our database using the data given to us by the user.
  #   get '/signup' => 'users#new'
  #   post '/users' => 'users#create'