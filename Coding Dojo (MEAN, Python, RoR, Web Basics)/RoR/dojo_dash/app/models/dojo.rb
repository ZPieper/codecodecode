class Dojo < ActiveRecord::Base
	has_many :students

	validates_presence_of :branch, :street, :state, :city
	validates_length_of :branch, :street, in: 6..30
	validates_length_of :city, in: 3..20
	validates :branch, :city, :street, uniqueness: { case_sensitive: false }
	validates_length_of :state, is: 2

	before_destroy :destroy_students

   private

   def destroy_students
     self.students.destroy_all   
   end
end
