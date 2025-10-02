# Blueprint: Website Giới Thiệu Nhóm Sinh Viên Công Giáo Phú Cường

## Tổng Quan

Xây dựng một trang web giới thiệu cho nhóm Sinh Viên Công Giáo Phú Cường. Trang web sẽ có thiết kế hiện đại, responsive, với tông màu chủ đạo là đỏ đậm. Giao diện bao gồm Header, Main Content, và Footer cố định.

## Cấu Trúc & Công Nghệ

*   **Framework:** React (Vite)
*   **Thư viện UI:** Material-UI (MUI)
*   **Routing:** React Router DOM
*   **Icons:** React Icons, MUI Icons
*   **Styling:** CSS Modules, MUI Theming (`@emotion/styled`)

## Kế Hoạch Thực Hiện

### Giai Đoạn 1: Cài Đặt và Cấu Trúc Dự Án

1.  **Cài đặt các thư viện cần thiết:**
    *   `@mui/material @emotion/react @emotion/styled`: Thư viện component UI.
    *   `react-router-dom`: Thư viện cho việc định tuyến (routing).
    *   `@mui/icons-material` và `react-icons`: Thư viện icon.
2.  **Tổ chức lại cấu trúc thư mục:**
    *   `src/components`: Chứa các component tái sử dụng (Header, FooterMenu).
    *   `src/pages`: Chứa các component cho từng trang (Home, News, Roster, Account, RegisterStudent, UpdateInfo).
    *   `src/assets`: Chứa các tài nguyên tĩnh như hình ảnh, font chữ.
    *   `src/theme`: Chứa file cấu hình theme cho MUI.

### Giai Đoạn 2: Xây Dựng Bố Cục Chính và Routing

1.  **Thiết lập `BrowserRouter`** trong `src/main.jsx`.
2.  **Tạo theme** với màu đỏ đậm làm màu chủ đạo.
3.  **Xây dựng `App.jsx`:**
    *   Sử dụng `ThemeProvider` của MUI.
    *   Tạo bố cục chính gồm Header, Main (với `<Outlet />`), và Footer.
    *   Thêm hình nền cho toàn bộ trang.
    *   Thiết lập các routes (`<Routes>`, `<Route>`) cho tất cả các trang, bao gồm `/register-student` và `/update-info`.

### Giai Đoạn 3: Xây Dựng Các Components

1.  **Component `Header` (`src/components/Header.jsx`):**
    *   Thanh bar cố định ở trên cùng, có nút chuyển đổi Sáng/Tối, thông báo chạy chữ, và icon người dùng.
2.  **Component `FooterMenu` (`src/components/FooterMenu.jsx`):**
    *   Menu điều hướng dạng "viên thuốc" cố định ở dưới cùng.
3.  **Các trang con (`src/pages/`):**
    *   **Trang `Home.jsx`**: 
        *   Thiết kế với slideshow ảnh, logo, các thẻ thông tin và thư viện ảnh.
        *   **Khu vực "Thông Báo"**: Thêm một khu vực mới dưới phần chào mừng, chứa 2 thẻ hành động:
            *   **"Ghi Danh Tân Sinh Viên"**: Thẻ có ảnh nền, icon, và tiêu đề. Khi nhấp vào, điều hướng đến trang `/register-student`.
            *   **"Cập Nhật Thông Tin Thành Viên"**: Thẻ tương tự, điều hướng đến trang `/update-info`.
        *   Đã cập nhật `Home.module.css` để định dạng cho khu vực và các thẻ mới.
    *   **Trang `News.jsx`**: Trang tin tức với layout dạng lưới và các thẻ tin tức có hiệu ứng tương tác.
    *   **Trang `RegisterStudent.jsx`**: Tạo trang với form cho phép tân sinh viên điền thông tin ghi danh.
    *   **Trang `UpdateInfo.jsx`**: Tạo trang cho phép thành viên tìm kiếm và cập nhật thông tin cá nhân.
    *   Các trang `Roster.jsx` và `Account.jsx` được tạo file ban đầu.

### Giai Đoạn 4: Hoàn Thiện và Tinh Chỉnh

1.  **Thêm hình nền** và tinh chỉnh CSS để đạt được hiệu ứng mong muốn.
2.  **Triển khai logic** cho nút chuyển đổi theme Sáng/Tối.
3.  **Kiểm tra và sửa lỗi** trên các trình duyệt và thiết bị khác nhau.
4.  **Chạy `eslint . --fix`** để đảm bảo code sạch.
