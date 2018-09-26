class Student < ActiveRecord::Base
  belongs_to :dojo

  	EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]+)\z/i
	validates_presence_of :first_name, :last_name, :email, :dojo_id
	validates_length_of :first_name, :last_name, in: 2..20
	validates_length_of :email, in: 6..30
	validates :email, uniqueness: { case_sensitive: false }, format: { with: EMAIL_REGEX }
end
