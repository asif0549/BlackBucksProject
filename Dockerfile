# Use a stable, lightweight official Python base image
FROM python:3.12-slim

# Set environment variables to optimize Python runtime in Docker
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application files to the container
COPY . .

# Expose port 5000 (Flask default port)
EXPOSE 5000

# Start the Flask web application
CMD ["python", "app.py"]
