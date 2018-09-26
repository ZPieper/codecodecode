class StudentsController < ApplicationController

  def create_student_form
  	number = params[:id]
  	@dojo = Dojo.find( number )
  	@dojos = Dojo.all
  end

  def create_student
  	number = params[:id]
  	@dojo = Dojo.find( number )
  	@dojos = Dojo.all
  	student = Student.create(student_params)

  	redirect_to '/dojos/' + student.dojo.id.to_s  if student.valid?

  	if (student.valid? == false)
  		redirect_to :back, alert: student.errors.full_messages
  	end
  end

  def delete_student
  	student = params[:person]
  	student = Student.find( student )
  	student.destroy
  	redirect_to '/dojos/' + params[:id].to_s
  end

  def show_one_student
  	number = params[:id]
  	@dojo = Dojo.find( number )
  	student = params[:person]
  	@student = Student.find( student )
  end

  def edit_student_form
  	number = params[:id]
  	@dojo = Dojo.find( number )
  	@dojos = Dojo.all
  	student = params[:person]
  	@student = Student.find( student )
  end

  def edit_student
  	number = params[:id]
  	student = params[:person]
  	@dojo = Dojo.find( number )
  	student = Student.find( student )
  	student.update(student_params)
  	@dojos = Dojo.all

  	redirect_to '/dojos/' + student.dojo.id.to_s  if student.valid?

  	if (student.valid? == false)
  		redirect_to :back, alert: student.errors.full_messages
  	end
  end

  private

  def student_params
  	params.require(:student).permit(:first_name, :last_name, :email, :dojo_id)
  end

end
