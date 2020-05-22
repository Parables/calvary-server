export const signinPage = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>

   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script>
$(document).ready(function(){
  $("btnSignIn").click(function(){
    $.post("/signin",
    {
      username: "John Doe,
      password: "secret"
    },
    function(data,status){
      alert("Data: " + data + "\nStatus: " + status);
    });
  });
});
</script>
        <style>
        .divone {
            line-height: 1.5;
            color: #2d3748;
            box-sizing: border-box;
            border-width: 0;
            border-style: solid;
            border-color: #e2e8f0;
            background-color: #edf2f7;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            height: 100vh;
            padding-top: 5.5rem;
            -webkit-font-smoothing: antialiased;
        }

        .divtwo {
            line-height: 1.5;
            color: #2d3748;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            -webkit-font-smoothing: antialiased;
            box-sizing: border-box;
            border-width: 0;
            border-style: solid;
            border-color: #e2e8f0;
            background-color: #fff;
            border-radius: 0.5rem;
            margin-left: auto;
            margin-right: auto;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
            padding-top: 2.5rem;
            padding-bottom: 2.5rem;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            width: 33.333333%;
        }

        h1 {
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
            box-sizing: border-box;
            border-width: 0;
            border-style: solid;
            border-color: #e2e8f0;
            margin: 0;
            font-size: inherit;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            font-weight: 600;
            text-align: center;
            color: #5a67d8;
        }

        .txtInput {
            -webkit-font-smoothing: antialiased;
            box-sizing: border-box;
            border-style: solid;
            font-family: inherit;
            font-size: 100%;
            margin: 0;
            overflow: visible;
            line-height: inherit;
            color: inherit;
            border-color: #cbd5e0;
            border-radius: 0.25rem;
            border-width: 1px;
            display: block;
            margin-left: auto;
            margin-right: auto;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            padding-left: 1rem;
            padding-right: 1rem;
            width: 20rem;
        }

        .btn {
            -webkit-font-smoothing: antialiased;
            box-sizing: border-box;
            border-width: 0;
            border-style: solid;
            border-color: #e2e8f0;
            font-size: 100%;
            margin: 0;
            overflow: visible;
            line-height: inherit;
            -webkit-appearance: button;
            background-color: #5a67d8;
            border-radius: 0.375rem;
            cursor: pointer;
            display: block;
            align-self: center;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 1rem;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            padding-left: 1rem;
            padding-right: 1rem;
            color: #fff;
        }

        p {
            line-height: 1.5;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            -webkit-font-smoothing: antialiased;
            box-sizing: border-box;
            border-width: 0;
            border-style: solid;
            border-color: #e2e8f0;
            margin: 0;
            text-align: center;
            color: #a0aec0;
            font-size: 0.75rem;
        }

        .my-4 {
            margin-top: 1rem;
            margin-bottom: 1rem;
        }

        .mt-4 {
            margin-top: 1rem;
        }
    </style>
</head>

<body>
    <div class="divone">
        <div class="divtwo">
            <h1>Welcome, please sign into your account</h1>
            <form id="form">
                <input type="text" id="username" name="username" autocomplete="username" placeholder="johndoe@gmail.com"
                    class="mt-4 txtInput">
                <input type="password" id="password" name="password" placeholder="password"
                    autocomplete="current-password" class="my-4  txtInput">
                <input id="btnSignIn"  name="btnSignIn"  class="btn" type="submit" value="Sign In">
            </form>
            <p>©2020 ParaSoft Dev Studio. All rights reserved.</p>
        </div>
    </div>
</body>

</html>`