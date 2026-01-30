/**
 * NOTIFICATIONS DATA SOURCE
 * 
 * This file contains the single source of truth for all notifications on the website.
 * It is used by both the Homepage (index.html) and the Notifications page (notifications.html).
 * 
 * HOW TO USE:
 * 1. To add a new notification, add a new object to the top of the 'notifications' array.
 * 2. The Homepage will automatically display the top 4 items.
 * 3. The Notifications page will display all items in this list.
 * 
 * FIELD DEFINITIONS:
 * - date:  The text displayed in the date button (e.g., "Sep 24", "2025", "New").
 * - title: The main text of the notification link.
 * - link:  The relative path to the document (e.g., "documents/filename.pdf").
 * - type:  The file type displayed in the metadata (e.g., "PDF").
 * - size:  The file size displayed in the metadata (e.g., "1.1 MB").
 */
const notifications = [

    {
        date: "2025",
        title: "Minutes of eReport Inaugural Meet 2025",
        link: "documents/Minutes of eReport Inaugural Meet 2025.pdf",
        type: "PDF",
        size: "1.1 MB"
    },
    {
        date: "2025",
        title: "eReport Inaugural Meet 2025 Presentation",
        link: "documents/eReport Inaugural Meet 2025.pdf",
        type: "PDF",
        size: "1.8 MB"
    },
    {
        date: "2025",
        title: "Meghalaya Housing engineering and technical service (Amendment) Rules, 2025",
        link: "documents/Meghalaya Housing engineering and technical service (Amendment) Rules, 2025.pdf",
        type: "PDF",
        size: "563 KB"
    },
    {
        date: "Sep 24",
        title: "Notice for extension of submission date of NIQ - 27th Sept 2024",
        link: "documents/Notice for extension of submissiion date of NIQ.pdf",
        type: "PDF",
        size: "155 KB"
    },
    {
        date: "Aug 24",
        title: "MOM Workshop cum Training August 2024",
        link: "documents/2024-Minutes of Workshop cum Training with NIC held on 22nd July, 2024.pdf",
        type: "PDF",
        size: "326 KB"
    },
    {
        date: "Oct 23",
        title: "Notification on Sexual Harassment at Workplace",
        link: "documents/Notification ,members of Sexual harassment at work place .pdf",
        type: "PDF",
        size: "521 KB"
    },
    {
        date: "Jul 22",
        title: "Awareness cum Training Program @NIC MSC Shillong : July 2022",
        link: "documents/Minutes of Awareness Training @NIC MSC Shillong July 2022.pdf",
        type: "PDF",
        size: "571 KB"
    },
    {
        date: "Oct 21",
        title: "Awareness cum Training Program on Website Updation Proceess and Kavach-Email, services and eforms :October 2021",
        link: "documents/Minutes of Annual Meet cum training oct2021.pdf",
        type: "PDF",
        size: "2.0 MB"
    },
    {
        date: "Oct 20",
        title: "Notice for Meeting of Departmental Tender Committee :: 15 October 2020",
        link: "tenders/2020 Meeting of DTC or DPB.pdf",
        type: "PDF",
        size: "477 KB"
    },
    {
        date: "2020",
        title: "MEGHALAYA HOUSING (SUBORDINATE) STATISTICAL SERVICE RULES, 2020",
        link: "documents/MEGHALAYA HOUSING (SUBORDINATE) STATISTICAL SERVICE RULES, 2020.pdf",
        type: "PDF",
        size: "1.0 MB"
    },
    {
        date: "Nov 19",
        title: "Awareness cum Training Program on Website Updation Process :November 2019",
        link: "documents/Minutes of the Awareness cum Training Program on Website Updation Process.pdf",
        type: "PDF",
        size: "469 KB"
    },
    {
        date: "Jul 18",
        title: "Housing Department Official Website http://meghousing.gov.in launched on 13th July 2018",
        link: "documents/Write up note on Housing Department Website.pdf",
        type: "PDF",
        size: "801 KB"
    },
    {
        date: "2018",
        title: "Notification of District Housing Committee under CMHAP 2018",
        link: "documents/Notification of District Housing Committee under CMHAP 2018.pdf",
        type: "PDF",
        size: "4.0 MB"
    },
    {
        date: "2017",
        title: "Meghalaya Housing Service Rules 2017",
        link: "documents/Meghalaya Housing Service Rules 2017.pdf",
        type: "PDF",
        size: "4.0 MB"
    },
    {
        date: "2017",
        title: "Meghalaya Housing Engineering and Technical SERVICE RULES 2017",
        link: "documents/Meghalaya Housing Engineering and Technical SERVICE RULES 2017.pdf",
        type: "PDF",
        size: "1.4 MB"
    }
];
