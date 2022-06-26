CREATE DATABASE twitterclonedb;
CREATE USER 'twittercloneusr'@'localhost' IDENTIFIED BY 'twitterclonepwd';
GRANT ALL ON twitterclonedb.* TO 'twittercloneusr'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;



sudo nano /etc/nginx/sites-available/staging.lifetivation.com



server {
    listen 80;

    server_name staging.lifetivation.com;
    root /home/roks/Desktop/react-native-twitter-clone-app/server-laravel/public;

    # allow 85.10.19.5;
    # deny all;

    # Remove the trailing slash.
    if (!-d $request_filename) {
        rewrite ^/(.*)/$ /$1 permanent;
    }

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload";


    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}



sudo ln -s /etc/nginx/sites-available/staging.lifetivation.com /etc/nginx/sites-enabled/staging.lifetivation.com