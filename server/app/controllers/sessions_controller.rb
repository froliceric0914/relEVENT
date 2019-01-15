class SessionsController < ApplicationController

  def new
  end

 def create
  @user = User.find_by(email: params[:user][:email])
  puts "user from db", @user
  puts "email from front-ent", params[:user][:email]
  puts "user from front-end", params
  if @user = User.authenticate_with_credentials(params[:user][:email], params[:user][:password])
      render :json =>
      {
        :status => 'ok',
        :message => 'User logged in!',
        :object => @user
      }.to_json
      else
        render :json =>
        {
          :status => 500,
          :message => 'Unsuccessful Login'
        }.to_json
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to '/login'
  end

end


# Can use the following to return the full error is the login is unsuccessful
# @user.errors.full_messages.to_sentence