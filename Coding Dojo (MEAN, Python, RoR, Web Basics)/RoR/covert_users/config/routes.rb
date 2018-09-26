Rails.application.routes.draw do
  
  get "users/new" => "users#new"
  post "users/new" => "users#new_user"
  get "sessions/new" => "sessions#new"
  post "sessions/new" => "sessions#create"
  get "sessions/destroy" => "sessions#destroy"
  get "users/:id/edit" => "users#edit"
  patch "users/:id/edit" => "users#edit_user"
  delete "users/:id" => "users#delete"
  get "users/:id" => "users#info"
  get "secrets" => "secrets#index"
  post "secrets" => "secrets#create"
  delete "secrets/:id" => "secrets#destroy"
  get "secrets/:id/like" => "likes#like"
  delete "secrets/:id/unlike" => "likes#unlike"

end
