<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top">
            <!-- Brand -->
            <div id="logo">
                <h1><router-link  class="brand navbar-brand ml-5" to="/"><span>|</span> Zark Academy</router-link></h1>
            </div>
            

            <!-- Toggler/collapsibe Button -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Navbar links -->
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav ml-auto mr-5">
                    <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" to="/admin">Admin</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" to="/login">Login</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" to="/register">Register</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" to="/main">ZarkAcademy</router-link> </li>
                    <li class="nav-item"><router-link class="nav-link" to="/updateProfile">Profile</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" to="/bookmarked">BookMarked</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" to="/userPosts">Post</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" to="/discussionCentre">DiscussionCentre</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" to="/allUser">Find User</router-link></li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'navbar',
}
</script>

<style scoped>

    #logo h1 {
        font-weight: 550;
    }
    #logo h1 .brand span {
        color: #39cfca;
        font-size: 40px;
        font-weight: 550;
    }

    #logo h1 .brand {
        font-size: 33px;
        letter-spacing: 3px;
    }

    .navbar {
        background: rgb(50,135,190);
        background: linear-gradient(90deg, rgba(50,135,190,1) 0%, rgba(66,190,199,1) 50%, rgba(50,135,190,1) 100%);
    }

</style>