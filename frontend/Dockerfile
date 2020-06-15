FROM nginx:alpine
COPY ./build /app
RUN chmod 755 -R /app
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf