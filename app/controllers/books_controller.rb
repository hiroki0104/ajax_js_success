# frozen_string_literal: true

class BooksController < ApplicationController
  def new
    @book = Book.new
    @books = Book.all.order(created_at: 'desc')
  end

  def create
    @book = Book.new(book_params)
    @book.save
    render json: @book
  end

  def destroy
    @book = Book.find(params[:id])
    @book_id = @book.id
    @book.delete
    render json: @book_id
  end

  private

  def book_params
    params.require(:book).permit(:title, :body)
  end
end
