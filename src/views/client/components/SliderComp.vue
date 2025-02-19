<template>
    <div class="h-screen bg-cover bg-[url(@/assets/img/banner.jpg)] bg-center relative">
        <div class="absolute top-[50%] h-[50%] w-full">
            <div class="container mx-auto flex flex-col gap-4 left-0 right-0 border-l-4 pl-7 border-white">
                <h1 class="text-white text-7xl font-extrabold">The Gorge</h1>
                <p class="text-white leading-7 text-lg w-1/2">
                    Hai điệp viên được đào tạo bài bản (Miles Teller và Anya Taylor-Joy) được bổ nhiệm vào các vị trí trong tháp canh ở hai bên đối diện của một hẻm núi rộng lớn và được phân loại cao, bảo vệ thế giới khỏi một thế lực đen tối bí ẩn
                    chưa được tiết lộ ẩn núp bên trong. Họ gắn kết từ xa trong khi cố gắng cảnh giác để chống lại một kẻ thù vô hình. Khi mối đe dọa thảm khốc đối với nhân loại được tiết lộ với họ, họ phải cùng nhau làm việc trong một thử thách về cả
                    sức mạnh thể chất và tinh thần để giữ bí mật trong hẻm núi trước khi quá muộn.
                </p>
                <div>
                    <button class="border-2 hover:text-white duration-150 border-primary text-primary py-3 px-5 font-bold uppercase text-lg rounded-md hover-button-animation left">Xem ngay</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup></script>
<style scoped>
.hover-button-animation {
    position: relative;
    z-index: 1;
}
.hover-button-animation::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 100%;
    bottom: 0;
    left: 0;
    background-color: var(--primary-color);
    transition: transform 0.25s ease-out;
    z-index: -1;
}

.hover-button-animation:hover::after {
    transform: scaleX(1);
}

.hover-button-animation.left::after {
    transform-origin: bottom right;
}

.hover-button-animation.left:hover::after {
    transform-origin: bottom left;
}
</style>
