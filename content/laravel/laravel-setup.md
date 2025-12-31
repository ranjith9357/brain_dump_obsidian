
<span style="color:#FF9800; font-size:1.7em;">Laravel Setup Guide (From Scratch)</span>

<span style="color:#FF9800; font-size:1.3em;">Prerequisites </span>

Before installing Laravel, ensure the following are installed:

- PHP 8.1+ (Check version: `php -v`)
    
- Composer (Dependency manager for PHP)
    
    `composer -V`
    
- Database (MySQL, PostgreSQL, SQLite, etc.)
    
- Web server (Apache, Nginx, or use Laravel's built-in server)

Do We Need Apache for Local Development?  <span style="color:#FF9800; text-decoration: underline; font-size:1.3em;">No</span>

For local development, Laravel already provides its own server.

`php artisan serve`

This command:

- Starts a built-in PHP development server
    
- Runs Laravel on `http://127.0.0.1:8000`

<span style="color:#FF9800; font-size:1.3em;">Optional:</span>

- Node.js & npm (for frontend assets)
    
- Git(for version control)

<span style="color:#FF9800; font-size:1.3em;">Install Composer</span>

If not installed:

```
Linux/macOS
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
sudo mv composer.phar /usr/local/bin/composer

Windows
Download Composer from https://getcomposer.org/download/
```

<span style="color:#FF9800; font-size:1.1em;">Ubuntu Shortcut (Very Easy)</span>

`sudo apt update `

`sudo apt install composer -y`

Verify:

`composer -V`

<span style="color:#FF9800; font-size:1.3em;">Create a New Laravel Project</span>

You have two options: via Laravel Installer or via Composer.

Option 1: <span style="color:#FF9800; font-size:1em;">Using Laravel Installer</span>

```
composer global require laravel/installer
laravel new project-name
cd project-name
```

Option 2: <span style="color:#FF9800; font-size:1em;">Using Composer</span>
```
composer create-project laravel/laravel project-name
cd project-name
```

<span style="color:#FF9800; font-size:1em;">Configure Environment</span>

Laravel uses `.env` for configuration.

1. Copy `.env.example` to `.env` (usually already done):

2. Set up database connection:

	DB_CONNECTION=pgsql
	DB_HOST=127.0.0.1
	DB_PORT=5432
	DB_DATABASE=qds
	DB_USERNAME=qds
	DB_PASSWORD=******

<span style="color:#FF9800; font-size:1em;">Generate app key:</span>

`php artisan key:generate`

<span style="color:#FF9800; font-size:1em;">Set Folder Permissions (Linux)</span>

```
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

<span style="color:#FF9800; font-size:1em;">Run Migrations</span>

Laravel comes with default migrations. To create tables:

`php artisan migrate`

<span style="color:#FF9800; font-size:1em;">Start Development Server</span>

`php artisan serve`

<span style="color:#FF9800; font-size:1em;">Frontend Setup (Vite – Laravel 9+)</span>

```
npm install
npm run dev
```

<span style="color:#FF9800; font-size:1em;">Production build:</span>

`npm run build`

<span style="color:#FF9800; font-size:1.8em;">Filament v3 Setup</span>

What is Filament? (Simple Explanation)

Filament is an admin panel for Laravel.

Instead of manually creating:

- Admin pages
    
- Forms
    
- Tables
    
- CRUD screens
    
👉 Filament creates them automatically using PHP classes.

Think of Filament as:

“Admin dashboard generator for Laravel”

When to Use Filament

Use Filament when you need:

- Admin panel
    
- Backend dashboard
    
- CRUD operations
    
- Reports & charts
    
Not for:

- Public website UI
    
- Customer-facing pages

<span style="color:#FF9800; font-size:1.8em;">Requirements (Very Important)</span>

Before installing Filament v3, ensure:

|Requirement|Version|
|---|---|
|Laravel|10 or 11|
|PHP|8.1+|
|Livewire|Included|
|Alpine.js|Included|

Check Laravel version:

`php artisan --version`

<span style="color:#FF9800; font-size:1.4em;">Install Filament v3</span>

Run inside your Laravel project:

`composer require filament/filament:"^3.0"`

<span style="color:#FF9800; font-size:1.1em;">Install Filament Panel</span>

Filament works using Panels.

`php artisan filament:install --panels`

Choose:

`Which panel would you like to install? > admin`

This creates:

- Admin panel
    
- Dashboard
    
- Config files

<span style="color:#FF9800; font-size:1.1em;">Create Admin User</span>

Filament needs a user to log in.

`php artisan make:filament-user`

Enter:

- Name
    
- Email
    
- Password

This user logs into Filament.

<span style="color:#FF9800; font-size:1.1em;">Start Server & Login</span>

`php artisan serve`

<span style="color:#FF9800; font-size:1.1em;">Open browser:</span>

`http://127.0.0.1:8000/admin`

Login using the Filament user credentials.

Filament dashboard is ready!



