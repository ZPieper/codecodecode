class DojosController < ApplicationController
  def show_dojos
  	@dojos = Dojo.all
  	@count = Dojo.count
  end

  def create_dojo
  	dojo = Dojo.create(dojo_params)

  	redirect_to '/dojos' if dojo.valid? == true

  	if (dojo.valid? == false)
  		redirect_to '/dojos/new', alert: dojo.errors.full_messages
  	end
  end

  def create_dojo_form
  end

  def delete_dojo
  	number = params[:id]
  	dojo = Dojo.find( number )
  	dojo.destroy
  	redirect_to '/dojos'
  end

  def show_one_dojo
  	number = params[:id]
  	@dojo = Dojo.find( number )
  	@students = @dojo.students
  end

  def edit_dojo_form
  	number = params[:id]
  	@dojo = Dojo.find( number )
  end

  def edit_dojo
  	number = params[:id]
  	dojo = Dojo.find( number )
  	dojo.update(dojo_params)

  	redirect_to '/dojos' if dojo.valid? == true

  	if (dojo.valid? == false)
  		redirect_to '/dojos/' + number.to_s + '/edit', alert: dojo.errors.full_messages
  	end
  end

  private
  def dojo_params
  	params.require(:dojo).permit(:branch, :street, :city, :state)
  end

end
