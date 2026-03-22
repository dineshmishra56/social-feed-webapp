# 📱 Social Feed Web App with Offline Queueing

A modern social feed application built with a focus on **offline-first experience**, **real-time UI updates**, and **smooth user interactions**. This app allows users to create, view, and interact with posts—even without an active internet connection.

---

## 🚀 Features

### 1. 📰 Feed Display

* Displays a list of posts with:

  * Text content
  * Images
  * Username
  * Timestamp
* Supports **infinite scrolling / pagination** (e.g., loads 10 posts at a time)
* Implements **local caching** so posts remain visible:

  * After page refresh
  * When the user is offline

---

### 2. ✍️ Create Post

* Users can create posts with:

  * Text
  * Image
* Validation rules:

  * A post must contain **at least text or an image**
* Post management:

  * ✏️ Edit own posts
  * 🗑️ Delete own posts

---

### 3. 🔄 Offline Queueing

* Posts are first added to a **local queue** before uploading
* Each post shows real-time status:

  * ⏳ Pending
  * ⬆️ Uploading
  * ✅ Success
  * ❌ Failed

#### Offline Behavior:

* If user is offline:

  * Posts remain in **Pending** state
* When internet is restored:

  * Queue automatically processes pending posts
  * Status updates in real time

---

### 4. 📊 Upload Progress

* For posts with images:

  * Displays a **live upload progress bar**
* Progress updates dynamically during upload

---

### 5. ❤️ Reactions

* Users can interact with posts by:

  * 👍 Liking posts
  * 💬 Commenting on posts
* Features:

  * Displays like count and comments
  * Uses **optimistic UI updates** (instant feedback before server confirmation)

---

## 🌐 Connectivity Handling

* Detects network status (online/offline)
* Automatically syncs queued actions when connection is restored
* Ensures a seamless user experience even with unstable internet

---

## ⚙️ Tech Highlights

* Offline-first architecture
* Real-time UI updates
* Optimistic rendering
* State management (e.g., Redux)
* Local storage / caching mechanisms

---

## 📌 Key Benefits

* Works even without internet
* Smooth and responsive UI
* Reliable data syncing
* Better user experience in low-network conditions

---

## 📷 Future Improvements

* Push notifications
* User authentication
* Real-time chat integration
* Advanced media uploads (video, multiple images)

---

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start
```

---

## 📄 License

This project is open-source and available under the MIT License.

---

💡 *Built to demonstrate real-world challenges like offline handling, optimistic updates, and scalable UI architecture.*
