# Seichats Widget Integration Guide

## Introduction

The Seichats Widget allows you to easily add a chat widget to your website. Follow these simple steps to integrate the widget into your application.

## Integration Steps

To integrate the Seichats Widget, you need to add a few lines of code to your HTML file and include a specific `<div>` element in your HTML body.

### Step 1: Add Stylesheet and Script

Add the following lines of code to the `<head>` section of your HTML file. This includes the necessary CSS and JavaScript for the widget.

```html
<head>
  <link
    href="https://keith-web3.github.io/integrations/dist/index.css"
    rel="stylesheet"
  />
  <script
    src="https://keith-web3.github.io/integrations/dist/index.js"
    defer
  ></script>
</head>
```

### Step 2: Add Widget Container

Include the following `<div>` element in the `<body>` section of your HTML file. This is where the Seichats Widget will be rendered.

```html
<body>
  <!-- Other content of your body -->

  <div id="seichats-widget"></div>

  <!-- Other content of your body -->
</body>
```

### Step 3: Run Your Application

After adding the above lines of code, run your application. The Seichats Widget should now be integrated and functional on your website.

### Example
Here’s an example of a complete HTML file with the Seichats Widget integrated:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Application</title>
  <link
    href="https://keith-web3.github.io/integrations/dist/index.css"
    rel="stylesheet"
  />
  <script
    src="https://keith-web3.github.io/integrations/dist/index.js"
    defer
  ></script>
</head>
<body>
  <h1>Welcome to My Application</h1>
  <p>This is a sample application with the Seichats Widget integrated.</p>

  <div id="seichats-widget"></div>
</body>
</html>
```
