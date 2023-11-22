FROM nginx:1.17.1-alpine

# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the static files
COPY dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]