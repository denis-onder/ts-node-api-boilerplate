function CustomException(status: Number, message: String) {
  this.status = status;
  this.message = { error: message };
}

export default CustomException;
