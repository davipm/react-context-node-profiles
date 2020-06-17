<template>
  <li class="devItem">
    <header class="devHeader">
      <img :src="dev.avatar_url" :alt="dev.name" />
      <div class="devUserInfo">
        <strong>{{ dev.name }}</strong>
        <span>{{ dev.techs.join(", ") }}</span>
      </div>
    </header>
    <p>{{ dev.bio }}</p>
    <a
      :href="`https://github.com/${dev.github_username}`"
      target="_blank"
      rel="noopener noreferrer"
    >
      Acessar perfil no Github
    </a>
  </li>
</template>

<script>
export default {
  name: "DevItem",
  props: ["dev"],
};
</script>

<style scoped lang="scss">
.devItem {
  background-color: #ffffff;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.02);
  border-radius: 2px;
  padding: 20px;

  p {
    color: #666666;
    font-size: 14px;
    line-height: 20px;
    margin: 10px 0;
  }

  a {
    display: inline-block;
    color: #8e4dff;
    font-size: 14px;
    text-decoration: none;
    transition: all 0.15s ease-in-out;

    &:hover {
      color: #5a2ea6;
    }
  }
}

.devHeader {
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 54px;
    height: 54px;
    border-radius: 50%;
  }
}

.devUserInfo {
  margin-left: 20px;

  strong {
    display: block;
    font-size: 16px;
    color: #333333;
    line-height: 1;
  }

  span {
    font-size: 13px;
    color: #999999;
    margin-top: 2px;
  }
}
</style>
