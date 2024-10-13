<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello World</h1>

    <script>
        fetch('http://localhost:8000/students')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error fetching students:', error));

    </script>
    
</body>
</html>