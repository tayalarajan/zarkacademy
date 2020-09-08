<template>
    <div>
        <footer class="footer-area section-gap">
            <div class="container">
                <div class="row">
                <div class="col-lg-3 col-md-6 single-footer-widget">
                    <h4>Top Courses</h4>
                    <ul>
                    <li><router-link to="#">Vue JS</router-link></li>
                    <li><router-link to="#">Node JS</router-link></li>
                    <li><router-link to="#">Angular JS</router-link></li>
                    <li><router-link to="#">REST Api</router-link></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6 single-footer-widget">
                    <h4>Quick Links</h4>
                    <ul>
                    <li><router-link to="/main">Courses</router-link></li>
                    <li><router-link to="/login">Login</router-link></li>
                    <li><router-link to="/Register">Register</router-link></li>
                    <li><router-link to="#">Terms of Service</router-link></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6 single-footer-widget">
                    <h4>Features</h4>
                    <ul>
                    <li><router-link to="#">Vue JS</router-link></li>
                    <li><router-link to="#">Node JS</router-link></li>
                    <li><router-link to="#">Angular JS</router-link></li>
                    <li><router-link to="#">REST Api</router-link></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6 single-footer-widget">
                    <h4>Resources</h4>
                    <ul>
                    <li><router-link to="#">Documentation</router-link></li>
                    <li><router-link to="#">Java Script</router-link></li>
                    <li><router-link to="#">Internet</router-link></li>
                    <li><router-link to="#">Youtube</router-link></li>
                    </ul>
                </div>
                </div>
                <div class="footer-bottom row align-items-center">
                <p class="footer-text m-0 col-lg-8 col-md-12"><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                Copyright &copy; 2020 All rights reserved | Created by <a href="https://thezark.in" target="_blank">ZARK</a></p>
                <div class="col-lg-4 col-md-12 footer-social">
                    <a href="#"><i class="fa fa-facebook"></i></a>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                    <a href="#"><i class="fa fa-youtube"></i></a>
                    <a href="#"><i class="fa fa-instagram"></i></a>
                </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'footer'
}
</script>