const { createApp } = Vue;
        
createApp({
    data() {
        return {
            source: { title: '', questions: [] },
            search: '',
            isMobile: false
        };
    },
    computed: {
        filteredQuestions() {
            return this.source.questions.filter(q => 
                q.question_text.toLowerCase().includes(this.search.toLowerCase())
            );
        }
    },
    mounted() {
        $.ajax({
            url: 'assets/data/answers.json',
            dataType: 'json',
            success: (data) => {
                this.source = data.source;
            },
             error: (err) => {
                console.error("Failed to load JSON:", err);
            }
        });

        // initialize device check
        this.checkDevice();
        // update on resize or orientation change
        window.addEventListener('resize', this.checkDevice);
        window.addEventListener('orientationchange', this.checkDevice);

        // press '/' function
        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                this.$refs.search.focus();
                this.$refs.search.select();
            }
        });
    },
    methods: {
        checkDevice() {
            // use a combination of screen width and user agent for better mobile detection
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const isSmallScreen = window.innerWidth <= 768;
            const userAgent = navigator.userAgent.toLowerCase();
            const isMobileUA = /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
            this.isMobile = isSmallScreen || isTouchDevice || isMobileUA;
        }
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkDevice);
        window.removeEventListener('orientationchange', this.checkDevice);
    }

}).mount('#app');
