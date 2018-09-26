Rails.application.routes.draw do

  root 'users#index'
  post "user" => "users#new_user"
  post "user/login" => "users#login"
  get "logout" => "users#logout"
  get "events" => "events#index"
  post "events" => "events#create"
  get "user/:id" => "users#edit"
  patch "user/:id" => "users#edit_user"
  delete "user/:id" => "users#delete"
  get "events/:id" => "events#show"
  get "events/:id/attend" => "events#join"
  get "events/:id/unattend" => "events#unjoin"
  get "events/:id/delete" => "events#delete"
  get "events/:id/edit" => "events#edit"
  patch "events/:id/edit" => "events#edit_event"
  post "events/:id/comment" => "events#add_comment"

end
