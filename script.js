document.addEventListener("DOMContentLoaded", () => {
  updateCountdown()
  checkMessage()
})

function updateCountdown() {
  const now = new Date()
  const valentine = new Date(now.getFullYear(), 1, 14) // February 14th
  if (now > valentine) {
    valentine.setFullYear(valentine.getFullYear() + 1)
  }

  const timeDiff = valentine - now
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))

  document.getElementById("countdown").textContent = `${days}d ${hours}h ${minutes}m until Valentine's Day`
  document.getElementById("days-left").textContent = `${days} days until Valentine's Day`

  setTimeout(updateCountdown, 60000) // Update every minute
}

function checkMessage() {
  const today = new Date().getDate()
  const month = new Date().getMonth() // 0-indexed, so February is 1
  let message = ""

  if (month === 1) {
    // February
    if (today === 11) {
      message = "To me, you are perfect (Yes. YOU!)."
    } else if (today === 12) {
      message = "Words can't describe my love for you so I made you this website."
    } else if (today === 13) {
      message = "Right from the start, you stole my heart."
    } else if (today === 14) {
      message =
        "HAPPY VALENTINE'S DAY Dweety. I'm so lucky to have you as my valentine this and every other year of my life. I have something else I made for you."
    } else {
      document.getElementById("envelope").setAttribute("onclick", "alert('Be patient Dweety')")
      return
    }
  } else {
    document.getElementById("envelope").setAttribute("onclick", "alert('Be patient Dweety')")
    return
  }

  document.getElementById("message-text").innerText = message
}

function openEnvelope() {
  const envelope = document.getElementById("envelope")
  envelope.classList.add("open")
  setTimeout(() => {
    envelope.style.display = "none"
    document.getElementById("message-container").classList.remove("hidden")
    setTimeout(() => {
      document.querySelector(".message-box").classList.add("show")
    }, 100)
  }, 1000) // Wait for 1 second before hiding the envelope and showing the message
}

// Service Worker Registration for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered successfully:", registration.scope)
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error)
      })
  })
}

