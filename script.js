// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Navigation switching
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // NFC Status simulation
    simulateNFCActivity();
    
    // Initialize real-time updates
    initializeRealTimeUpdates();
});

// Simulate NFC activity
function simulateNFCActivity() {
    const nfcStatus = document.getElementById('nfc-status');
    const activityList = document.querySelector('.activity-list');
    
    // Simulate random NFC events
    setInterval(() => {        const events = [
            { name: 'Jazz Thine Mark Lee', action: 'entered Main Building', status: 'success' },
            { name: 'Yuji Lowe', action: 'entered Classroom A-101', status: 'success' },
            { name: 'Prince Carl Nagtalon', action: 'entered Library', status: 'success' },
            { name: 'Justine Lawrence Coronel', action: 'entered Science Lab', status: 'success' },
            { name: 'Unknown Tag', action: 'attempted unauthorized access', status: 'danger' }
        ];
        
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        addActivityItem(randomEvent);
        
        // Update stats
        updateStats();
    }, 10000); // Every 10 seconds
}

// Add new activity item
function addActivityItem(event) {
    const activityList = document.querySelector('.activity-list');
    const newItem = document.createElement('div');
    newItem.className = 'activity-item';
    newItem.style.opacity = '0';
    newItem.style.transform = 'translateY(-10px)';
    
    newItem.innerHTML = `
        <div class="activity-avatar">
            <i class="fas fa-user"></i>
        </div>
        <div class="activity-content">
            <p><strong>${event.name}</strong> ${event.action}</p>
            <span class="activity-time">Just now</span>
        </div>
        <div class="activity-status ${event.status}">
            <i class="fas fa-${event.status === 'success' ? 'check' : 'times'}"></i>
        </div>
    `;
    
    // Insert at the beginning
    activityList.insertBefore(newItem, activityList.firstChild);
    
    // Animate in
    setTimeout(() => {
        newItem.style.opacity = '1';
        newItem.style.transform = 'translateY(0)';
        newItem.style.transition = 'all 0.3s ease';
    }, 100);
    
    // Remove oldest items if more than 5
    const items = activityList.querySelectorAll('.activity-item');
    if (items.length > 5) {
        items[items.length - 1].remove();
    }
    
    // Update timestamps
    updateTimestamps();
}

// Update timestamps
function updateTimestamps() {
    const timeElements = document.querySelectorAll('.activity-time');
    timeElements.forEach((element, index) => {
        if (index === 0) {
            element.textContent = 'Just now';
        } else {
            element.textContent = `${(index + 1) * 2} minutes ago`;
        }
    });
}

// Update stats
function updateStats() {
    const presentCount = document.querySelector('.stat-card:nth-child(2) h3');
    const accessEvents = document.querySelector('.stat-card:nth-child(3) h3');
    const alerts = document.querySelector('.stat-card:nth-child(4) h3');
    
    // Simulate real-time updates
    const currentPresent = parseInt(presentCount.textContent.replace(',', ''));
    const currentEvents = parseInt(accessEvents.textContent.replace(',', ''));
    const currentAlerts = parseInt(alerts.textContent);
    
    // Random small changes
    const presentChange = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
    const eventsChange = Math.floor(Math.random() * 5) + 1; // 1-5
    const alertsChange = Math.random() < 0.1 ? 1 : 0; // 10% chance of new alert
    
    presentCount.textContent = (currentPresent + presentChange).toLocaleString();
    accessEvents.textContent = (currentEvents + eventsChange).toLocaleString();
    if (alertsChange > 0) {
        alerts.textContent = (currentAlerts + alertsChange).toString();
    }
}

// Initialize real-time updates
function initializeRealTimeUpdates() {
    // Update timestamps every minute
    setInterval(updateTimestamps, 60000);
    
    // Simulate database sync
    setInterval(() => {
        console.log('Syncing with database...');
        // In a real application, this would fetch latest data from the server
    }, 30000);
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const studentCards = document.querySelectorAll('.student-card');
            
            studentCards.forEach(card => {
                const studentName = card.querySelector('h3').textContent.toLowerCase();
                const studentId = card.querySelector('p').textContent.toLowerCase();
                
                if (studentName.includes(searchTerm) || studentId.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Table sorting functionality
function initializeTableSorting() {
    const tables = document.querySelectorAll('.data-table');
    
    tables.forEach(table => {
        const headers = table.querySelectorAll('th');
        
        headers.forEach((header, index) => {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                sortTable(table, index);
            });
        });
    });
}

// Sort table by column
function sortTable(table, columnIndex) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        const aText = a.cells[columnIndex].textContent.trim();
        const bText = b.cells[columnIndex].textContent.trim();
        
        // Try to sort as numbers first
        const aNum = parseFloat(aText);
        const bNum = parseFloat(bText);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return aNum - bNum;
        }
        
        // Sort as strings
        return aText.localeCompare(bText);
    });
    
    // Clear tbody and append sorted rows
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
}

// Form validation
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Export functionality
function exportData(type) {
    // Simulate export functionality
    const data = gatherExportData(type);
    
    // Create and download CSV
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Gather data for export
function gatherExportData(type) {
    switch (type) {
        case 'attendance':
            return [
                ['Student ID', 'Name', 'Class', 'Check-in Time', 'Status', 'Location'],
                ['STU001', 'John Smith', '10-A', '08:15 AM', 'Present', 'Main Building'],
                ['STU002', 'Sarah Johnson', '10-A', '08:22 AM', 'Present', 'Classroom A-101'],
                ['STU003', 'Mike Brown', '10-B', '--', 'Absent', '--']
            ];
        case 'access_logs':
            return [
                ['Timestamp', 'Student/Tag', 'Location', 'Event Type', 'Status', 'Details'],
                ['2025-06-18 08:15:23', 'John Smith (NFC_001)', 'Main Building', 'Entry', 'Success', 'Normal access'],
                ['2025-06-18 08:22:15', 'Sarah Johnson (NFC_002)', 'Classroom A-101', 'Entry', 'Success', 'Normal access']
            ];
        default:
            return [];
    }
}

// Convert array to CSV
function convertToCSV(data) {
    return data.map(row => 
        row.map(cell => `"${cell}"`).join(',')
    ).join('\n');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeTableSorting();
    
    // Add event listeners for export buttons
    const exportButtons = document.querySelectorAll('.btn-success');
    exportButtons.forEach(button => {
        if (button.textContent.includes('Export')) {
            button.addEventListener('click', () => {
                const section = button.closest('.content-section').id;
                exportData(section.replace('-', '_'));
                showNotification('Report exported successfully!', 'success');
            });
        }
    });
    
    // Demo: Show periodic notifications
    setTimeout(() => {
        showNotification('NFC readers are online and functioning normally', 'success');
    }, 3000);
    
    setTimeout(() => {
        showNotification('Database sync completed', 'info');
    }, 8000);
});

// Handle window resize for responsive design
window.addEventListener('resize', function() {
    // Close mobile menu if window is resized to desktop
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('nav-menu');
        navMenu.classList.remove('active');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + D for Dashboard
    if (e.altKey && e.key === 'd') {
        e.preventDefault();
        document.querySelector('a[href="#dashboard"]').click();
    }
    
    // Alt + A for Attendance
    if (e.altKey && e.key === 'a') {
        e.preventDefault();
        document.querySelector('a[href="#attendance"]').click();
    }
    
    // Alt + S for Students
    if (e.altKey && e.key === 's') {
        e.preventDefault();
        document.querySelector('a[href="#students"]').click();
    }
    
    // Alt + L for Logs
    if (e.altKey && e.key === 'l') {
        e.preventDefault();
        document.querySelector('a[href="#access-logs"]').click();
    }
});

// Add notification styles if not already present
if (!document.querySelector('style[data-notifications]')) {
    const notificationStyles = document.createElement('style');
    notificationStyles.setAttribute('data-notifications', 'true');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            top: 90px;
            right: 20px;
            background: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 1001;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        }
        
        .notification.success {
            border-left: 4px solid #22c55e;
        }
        
        .notification.error {
            border-left: 4px solid #ef4444;
        }
        
        .notification.info {
            border-left: 4px solid #3b82f6;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #6b7280;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(notificationStyles);
}
