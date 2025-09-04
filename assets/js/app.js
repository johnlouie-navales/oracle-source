const { createApp } = Vue;
        
createApp({
    data() {
        return {
            source: { title: 'Oracle Q&A Source', questions: [] },
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

        this.checkDevice();
        window.addEventListener('resize', this.checkDevice);

        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                this.$refs.search.focus();
            }
        });
    },
    methods: {
        checkDevice() {
            this.isMobile = window.innerWidth <= 768;
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.checkDevice);
    }

}).mount('#app');
