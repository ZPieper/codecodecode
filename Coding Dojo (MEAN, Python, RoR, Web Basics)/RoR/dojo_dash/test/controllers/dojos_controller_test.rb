require 'test_helper'

class DojosControllerTest < ActionController::TestCase
  test "should get show_dojos" do
    get :show_dojos
    assert_response :success
  end

  test "should get create_dojo_form" do
    get :create_dojo_form
    assert_response :success
  end

end
