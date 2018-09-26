require 'rails_helper'
RSpec.describe UsersController, type: :controller do
  before do
    @user = create(:user)
  end
  context "when not logged in" do
    before do
      session[:user_id] = nil
    end
    it "cannot access show" do 
      get :info, id: @user
      expect(response).to redirect_to("/sessions/new")
    end
    it "cannot access edit" do
      post :edit, id: @user
      expect(response).to redirect_to("/sessions/new")
    end
    it "cannot access update" do
      patch :edit_user, id: @user
      expect(response).to redirect_to("/sessions/new")
    end
    it "cannot access destroy" do
      delete :delete, id: @user
      expect(response).to redirect_to("/sessions/new")
    end
  end
  context "when signed in as the wrong user" do
    before do
      session[:user_id] = 8
    end
    it "cannot access profile page another user" do
      get :info, id: @user
      expect(response).to redirect_to("/users/" + session[:user_id].to_s)
    end
    it "cannot access the edit page of another user" do
      post :edit, id: @user
      expect(response).to redirect_to("/users/" + session[:user_id].to_s)
    end
    it "cannot update another user" do
      patch :edit_user, id: @user
      expect(response).to redirect_to("/users/" + session[:user_id].to_s)
    end
    it "cannot destroy another user" do
      delete :delete, id: @user
      expect(response).to redirect_to("/users/" + session[:user_id].to_s)
    end
  end
end