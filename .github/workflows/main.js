        // JavaScript
        const playerBalanceSpan = document.getElementById('playerBalance');
        const caseSelectionGrid = document.getElementById('caseSelectionGrid');
        const selectedCasesList = document.getElementById('selectedCasesList');
        const totalBattleCostSpan = document.getElementById('totalBattleCost');
        const startBattleBtn = document.getElementById('startBattleBtn');
        const openingSection = document.getElementById('openingSection');
        const battleLanesContainer = document.getElementById('battleLanesContainer'); // New container for player lanes
        const yourTeamScoreSpan = document.getElementById('yourTeamScore');
        const opponentTeamScoreSpan = document.getElementById('opponentTeamScore');
        const battleResultsSection = document.getElementById('battleResultsSection');
        const battleResultsGrid = document.getElementById('battleResultsGrid');
        const backToSelectionBtn = document.getElementById('backToSelectionBtn');
        const createGroupCodeBtn = document.getElementById('createGroupCodeBtn');
        const joinGroupInput = document.getElementById('joinGroupInput');
        const joinGroupBtn = document.getElementById('joinGroupBtn');
        const myGroupCodeDisplay = document.getElementById('myGroupCode');
        const groupMessage = document.getElementById('groupMessage');
        const setupGroupMembers = document.getElementById('setupGroupMembers'); // For initial setup display
        const battleModeRadios = document.querySelectorAll('input[name="battleMode"]');
        const finalWinnerDeclaration = document.getElementById('finalWinnerDeclaration');


        let playerBalance = 1000;
        let selectedCases = [];
        let battleResults = []; // Stores items won by YOUR team for final display
        const itemWidth = 110; // item-card width + margin

        // Predefined random group codes (for simulation only)
        const predefinedGroupCodes = Array.from({ length: 1000 }, (_, i) => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let result = '';
            for (let j = 0; j < 6; j++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        });
        let currentGroupCode = null;

        // Structure for group members to explicitly hold arrays for each side, with score tracking
        let currentGroupMembers = {
            youSide: [{ id: 'you_0', name: 'You', totalValue: 0, itemsWon: [] }],
            opponentSide: [{ id: 'opp_0', name: 'Opponent 1', totalValue: 0, itemsWon: [] }]
        };

        // SUPER COIN specific items
        const superCoinRewards = [
            { name: "Karambit | Doppler (Ruby)", rarity: "legendary", value: 5000, image: "https://placehold.co/70x70/FF0000/FFFFFF?text=RubyKnife" },
            { name: "Butterfly Knife | Fade (FN)", rarity: "legendary", value: 4500, image: "https://placehold.co/70x70/FFFF00/000000?text=BFadeKnife" },
            { name: "M9 Bayonet | Emerald", rarity: "legendary", value: 4800, image: "https://placehold.co/70x70/00FF00/000000?text=EmeraldKnife" },
            { name: "Driver Gloves | Imperial Plaid", rarity: "legendary", value: 3500, image: "https://placehold.co/70x70/800080/FFFFFF?text=Gloves" },
            { name: "AWP | Gungnir", rarity: "contraband", value: 6000, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
            { name: "AK-47 | Wild Lotus", rarity: "contraband", value: 5500, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" }
        ];

        // 14 Cases based on CS:GO, with example prices and unique items/rarities
        const cases = [
            { id: 'case1', name: "Prime Case", price: 50, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q53Ifi_FqfA4b2s0b5lU5PzR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--",
                items: [
                    { name: "MP9 | Modest Threat", rarity: "common", value: 20, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "UMP-45 | Urban DDPAT", rarity: "common", value: 15, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "P250 | Element", rarity: "uncommon", value: 30, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "MP7 | Toxic", rarity: "uncommon", value: 25, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "FAMAS | Minimum Wear", rarity: "rare", value: 70, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "AWP | Boomerang", rarity: "epic", value: 180, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "M4A4 | Emperor Dragon", rarity: "legendary", value: 400, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" }
                ]
            },
            { id: 'case2', name: "Anubis Case", price: 70, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q53Ifi_FqfA4b2s0b5lU5PzR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--",
                items: [
                    { name: "AUG | Green Fist", rarity: "common", value: 30, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "XM1014 | Vlogger", rarity: "uncommon", value: 40, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "MP5-SD | Styrofoam", rarity: "rare", value: 90, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "AK-47 | Pyramid", rarity: "epic", value: 200, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "AWP | Shooting Star", rarity: "legendary", value: 450, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" }
                ]
            },
            { id: 'case3', name: "Recoil Case", price: 60, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q53Ifi_FqfA4b2s0b5lU5PzR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--",
                items: [
                    { name: "P2000 | Scorpion", rarity: "common", value: 25, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "G3SG1 | The Executioner", rarity: "uncommon", value: 35, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "MAC-10 | Red Elephant", rarity: "rare", value: 80, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "FAMAS | Turbo", rarity: "epic", value: 190, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "AWP | Phantoms", rarity: "legendary", value: 420, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" }
                ]
            },
            { id: 'case4', name: "Shattered Web Case", price: 80, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q53Ifi_FqfA4b2s0b5lU5PzR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--",
                items: [
                    { name: "MP9 | Wildfire", rarity: "common", value: 35, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "Nova | Radical", rarity: "uncommon", value: 45, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "P250 | Contamination", rarity: "rare", value: 100, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "M4A1-S | Bright Green", rarity: "epic", value: 220, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q55Ifi_FqfA4b2s0b5lU5PzR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "AWP | Medusa", rarity: "contraband", value: 700, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q55Ifi_FqfA4b2s0b5lU5PzR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" }
                ]
            },
            { id: 'case5', name: "Horizon Case", price: 90, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q53Ifi_FqfA4b2s0b5lU5PzR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--",
                items: [
                    { name: "AUG | Grip", rarity: "common", value: 40, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "MP9 | Bad Luck", rarity: "uncommon", value: 50, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "Galil AR | Retro", rarity: "rare", value: 110, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "AK-47 | The Empress", rarity: "epic", value: 250, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "Karambit | Lore", rarity: "legendary", value: 800, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" }
                ]
            },
            { id: 'case6', name: "Snakebite Case", price: 100, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q53Ifi_FqfA4b2s0b5lU5PzR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--",
                items: [
                    { name: "Five-SeveN | Monkey Business", rarity: "common", value: 45, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "SSG 08 | Detour", rarity: "uncommon", value: 55, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "MP9 | Green Worm", rarity: "rare", value: 120, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "AWP | Asiimov", rarity: "epic", value: 300, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "M4A4 | Howl", rarity: "contraband", value: 500, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" } // Example contraband
                ]
            },
            { id: 'case7', name: "Glove Case", price: 120, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q53Ifi_FqfA4b2s0b5lU5PzR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--",
                items: [
                    { name: "CZ75-Auto | Imprint", rarity: "common", value: 50, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "Glock-18 | High Beam", rarity: "uncommon", value: 60, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "M4A4 | Buzz Kill", rarity: "rare", value: 140, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "AK-47 | Frontside Misty", rarity: "epic", value: 350, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "AWP | Dragon Lore", rarity: "legendary", value: 600, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" }
                ]
            },
            { id: 'case8', name: "Operation Hydra Case", price: 150, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q53Ifi_FqfA4b2s0b5lU5PzR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--",
                items: [
                    { name: "Galil AR | Stone Cold", rarity: "common", value: 60, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "P90 | Grim", rarity: "uncommon", value: 70, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "UMP-45 | Factory New", rarity: "rare", value: 160, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "Desert Eagle | Elite Build", rarity: "epic", value: 400, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "AWP | Gungnir", rarity: "legendary", value: 750, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" }
                ]
            },
            { id: 'case9', name: "Gamma Case", price: 180, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q53Ifi_FqfA4b2s0b5lU5PzR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--",
                items: [
                    { name: "P250 | Viral", rarity: "common", value: 70, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "Negev | Desert-Strike", rarity: "uncommon", value: 80, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "Glock-18 | Wasteland Rebel", rarity: "rare", value: 180, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "M4A1-S | Mecha Industries", rarity: "epic", value: 450, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "AK-47 | Fire Serpent", rarity: "contraband", value: 1000, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" }
                ]
            },
            { id: 'case10', name: "Dreams & Nightmares Case", price: 200, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q53Ifi_FqfA4b2s0b5lU5PzR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--",
                items: [
                    { name: "Tec-9 | Rust Dust", rarity: "common", value: 80, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "MP7 | Bloodsport", rarity: "uncommon", value: 90, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "AWP | Fade", rarity: "rare", value: 200, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "M4A4 | Cyber Security", rarity: "epic", value: 500, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "AK-47 | Headshot", rarity: "legendary", value: 1200, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" }
                ]
            },
            { id: 'case11', name: "Spectrum Case", price: 250, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q53Ifi_FqfA4b2s0b5lU5PzR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--",
                items: [
                    { name: "USP-S | Forest DDPAT", rarity: "common", value: 100, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "MP7 | Scorched", rarity: "uncommon", value: 110, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "M4A4 | The Coalition", rarity: "rare", value: 250, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "AWP | Wildfire", rarity: "epic", value: 600, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "Karambit | Fade", rarity: "legendary", value: 1500, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" }
                ]
            },
            { id: 'case12', name: "Clutch Case", price: 300, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q53Ifi_FqfA4b2s0b5lU5PzR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--",
                items: [
                    { name: "Glock-18 | Water Elemental", rarity: "common", value: 120, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "Five-SeveN | Hyper Beast", rarity: "uncommon", value: 130, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "AK-47 | Redline", rarity: "rare", value: 300, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "Desert Eagle | Printstream", rarity: "epic", value: 700, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "M9 Bayonet | Lore", rarity: "legendary", value: 2000, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" }
                ]
            },
            { id: 'case13', name: "Danger Zone Case", price: 350, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q53Ifi_FqfA4b2s0b5lU5PzR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--",
                items: [
                    { name: "SCAR-20 | Assault", rarity: "common", value: 150, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "MP9 | Hot Rod", rarity: "uncommon", value: 160, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "AWP | Hyper Beast", rarity: "rare", value: 350, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "M4A4 | The Coalition", rarity: "epic", value: 800, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "Butterfly Knife | Fade", rarity: "legendary", value: 2500, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" }
                ]
            },
            { id: 'case14', name: "Prisma Case", price: 400, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" ,
                items: [
                    { name: "AK-47 | The Empress", rarity: "common", value: 200, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "M4A4 | Buzz Kill", rarity: "uncommon", value: 220, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "USP-S | Cortex", rarity: "rare", value: 400, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "AWP | Neo-Noir", rarity: "epic", value: 900, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" },
                    { name: "Butterfly Knife | Doppler", rarity: "legendary", value: 3000, image: "https://community.akamai.steamstatic.com/economy/image/-9a81dl2PrQqjoy_G_q533mtjBfD2gR_a_G5iU25vR_l_bK-C24fB2-o_bO0pL1a_oI8S_h5eBwI_F7w_4wK1iK0j_ZgY08tC2k1k0s5m0qC1m_fTjISG892I9g2Q9j2S2u_m0bS0g_-j0t2f0g--" }
                ]
            }
        ];

        // Rarity weights for item drops (higher weight = more common)
        const rarityWeights = {
            "common": 50,
            "uncommon": 25,
            "rare": 15,
            "epic": 8,
            "legendary": 2,
            "contraband": 0.5 // Very rare
        };
        const MAX_CASE_PRICE = 400; // Used for SUPER COIN chance calculation

        // --- Functions ---

        // Function to create an item card HTML
        function createItemCardHTML(item) {
            return `
                <div class="item-card ${item.rarity}">
                    <img src="${item.image}" onerror="this.onerror=null;this.src='https://placehold.co/70x70/3b3b6b/e0e0e0?text=Item';" alt="${item.name}">
                    <span class="item-name">${item.name}</span>
                </div>
            `;
        }

        // Helper function to get color based on rarity
        function getItemRarityColor(rarity) {
            const colors = {
                "common": 'var(--blue-color)',
                "uncommon": 'var(--blue-color)',
                "rare": 'var(--purple-color)',
                "epic": 'var(--pink-color)',
                "legendary": 'var(--gold-color)',
                "contraband": 'var(--red-color)',
                "super_coin": 'var(--super-coin-color)' // SUPER COIN color
            };
            return colors[rarity] || 'var(--text-color)';
        }

        // Function to populate the case selection grid
        function populateCaseSelection() {
            caseSelectionGrid.innerHTML = '';
            cases.forEach(c => {
                const caseDiv = document.createElement('div');
                caseDiv.className = 'case-option';
                caseDiv.dataset.caseId = c.id;
                caseDiv.innerHTML = `
                    <img src="${c.image}" onerror="this.onerror=null;this.src='https://placehold.co/70x70/3b3b6b/e0e0e0?text=Case';" alt="${c.name}">
                    <h3>${c.name}</h3>
                    <p>Price: ${c.price} Coins</p>
                `;
                caseDiv.addEventListener('click', () => toggleCaseSelection(c.id));
                caseSelectionGrid.appendChild(caseDiv);
            });
        }

        // Function to toggle case selection
        function toggleCaseSelection(caseId) {
            const caseElement = document.querySelector(`.case-option[data-case-id="${caseId}"]`);
            const index = selectedCases.findIndex(c => c.id === caseId);

            if (index > -1) {
                // Case is already selected, deselect it
                selectedCases.splice(index, 1);
                caseElement.classList.remove('selected');
            } else {
                // Case is not selected, select it
                const caseObj = cases.find(c => c.id === caseId);
                selectedCases.push(caseObj);
                caseElement.classList.add('selected');
            }
            updateSelectedCasesList();
            updateTotalCost();
        }

        // Function to update the list of selected cases
        function updateSelectedCasesList() {
            selectedCasesList.innerHTML = '';
            selectedCases.forEach(c => {
                const itemSpan = document.createElement('span');
                itemSpan.className = 'selected-case-item';
                itemSpan.innerHTML = `
                    ${c.name}
                    <button class="remove-btn" data-case-id="${c.id}">X</button>
                `;
                selectedCasesList.appendChild(itemSpan);
            });

            // Add event listeners for remove buttons
            document.querySelectorAll('.selected-case-item .remove-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const caseIdToRemove = e.target.dataset.caseId;
                    toggleCaseSelection(caseIdToRemove); // Use toggle to deselect
                });
            });
        }

        // Function to update the total cost
        function updateTotalCost() {
            const totalCost = selectedCases.reduce((sum, c) => sum + c.price, 0);
            totalBattleCostSpan.textContent = totalCost;
            startBattleBtn.disabled = selectedCases.length === 0;
        }

        // Function to get a random weighted item from a specific case
        function getRandomWeightedItem(caseItems) {
            let totalWeight = 0;
            for (const item of caseItems) {
                totalWeight += rarityWeights[item.rarity] || 1; // Default weight of 1 if not defined
            }

            let randomNum = Math.random() * totalWeight;

            for (const item of caseItems) {
                randomNum -= (rarityWeights[item.rarity] || 1);
                if (randomNum <= 0) {
                    return item;
                }
            }
            // Fallback: should not happen if weights are correct
            return caseItems[Math.floor(Math.random() * caseItems.length)];
        }

        // New function to handle a single case opening for a specific player (with their own reel)
        function openCaseForPlayer(playerObj, caseObj) {
            return new Promise(resolve => {
                // Access player-specific DOM elements directly from playerObj
                const playerCaseImageEl = playerObj.caseImageEl;
                const playerCaseNameEl = playerObj.caseNameEl;
                const playerCasePriceEl = playerObj.casePriceEl;
                const playerItemReelEl = playerObj.itemReelEl;
                const playerResultEl = playerObj.resultEl;
                const playerScoreSpan = playerObj.scoreSpanEl; // Get the score span for this player


                playerCaseImageEl.src = caseObj.image;
                playerCaseNameEl.textContent = caseObj.name;
                playerCasePriceEl.textContent = caseObj.price;
                playerResultEl.classList.remove('visible', 'error', 'success');
                playerResultEl.textContent = '';

                // Remove existing winner highlight
                const existingWinner = playerItemReelEl.querySelector('.item-card.winner');
                if (existingWinner) {
                    existingWinner.classList.remove('winner');
                }

                // Force reflow/re-render to reset transition
                playerItemReelEl.style.transition = 'none';
                playerItemReelEl.style.transform = `translateX(0px)`;
                playerItemReelEl.offsetHeight; // Trigger reflow
                playerItemReelEl.classList.remove('spinning');

                const spinItems = [];
                const itemsBeforeWinner = 50; // How many random items before the winner appears
                const winnerIndexInReel = itemsBeforeWinner;

                // --- SUPER COIN Logic ---
                const superCoinChance = Math.min(0.1, 0.005 + (caseObj.price / MAX_CASE_PRICE) * 0.095);
                let winningItem;

                if (Math.random() < superCoinChance) {
                    winningItem = { name: "SUPER COIN!", rarity: "super_coin", value: 0, image: "https://placehold.co/70x70/e622b1/FFFFFF?text=SUPER" };
                    console.log(`${playerObj.name} hit SUPER COIN!`);
                    // Populate reel with mixed items, with SUPER COIN at the winner spot
                    for (let i = 0; i < itemsBeforeWinner; i++) {
                        spinItems.push(caseObj.items[Math.floor(Math.random() * caseObj.items.length)]);
                    }
                    spinItems.push(winningItem); // SUPER COIN is the winner
                    for (let i = 0; i < 50; i++) {
                        spinItems.push(caseObj.items[Math.floor(Math.random() * caseObj.items.length)]);
                    }

                } else {
                    winningItem = getRandomWeightedItem(caseObj.items);
                    for (let i = 0; i < itemsBeforeWinner; i++) {
                        spinItems.push(caseObj.items[Math.floor(Math.random() * caseObj.items.length)]);
                    }
                    spinItems.push(winningItem);
                    for (let i = 0; i < 50; i++) {
                        spinItems.push(caseObj.items[Math.floor(Math.random() * caseObj.items.length)]);
                    }
                }

                // Clear and re-populate the reel with spinItems
                playerItemReelEl.innerHTML = '';
                spinItems.forEach(item => playerItemReelEl.innerHTML += createItemCardHTML(item));

                // Calculate the exact position to stop on the winning item
                const containerWidth = playerItemReelEl.parentElement.offsetWidth;
                const centerOffset = containerWidth / 2 - (itemWidth / 2);
                const targetOffset = winnerIndexInReel * itemWidth;
                const stopPosition = -targetOffset + centerOffset;

                const randomOffset = Math.random() * (itemWidth / 2) - (itemWidth / 4);
                const finalStopPosition = stopPosition + randomOffset;

                // Trigger the animation
                requestAnimationFrame(() => { // Use requestAnimationFrame for smoother transition start
                    playerItemReelEl.style.transition = 'transform 6s cubic-bezier(0.2, 0.8, 0.2, 1)';
                    playerItemReelEl.style.transform = `translateX(${finalStopPosition}px)`;
                });

                playerItemReelEl.addEventListener('transitionend', function handler() {
                    playerItemReelEl.removeEventListener('transitionend', handler);

                    const winnerCard = playerItemReelEl.children[winnerIndexInReel];
                    if (winnerCard) {
                        winnerCard.classList.add('winner');
                    }

                    if (winningItem.rarity === "super_coin") {
                        playerResultEl.textContent = `SUPER COIN! ${playerObj.name} hit the jackpot!`;
                        playerResultEl.style.color = getItemRarityColor(winningItem.rarity);
                        playerResultEl.classList.add('visible', 'success');

                        playerObj.totalValue += winningItem.value; // Add SUPER COIN value
                        if (playerObj.id === 'you_0') playerBalance += winningItem.value; // Only update main player's balance
                        playerObj.itemsWon = []; // Clear items won for current player (SUPER COIN replaces them)

                        // Add SUPER COIN specific rewards
                        for (let i = 0; i < 3 + Math.floor(Math.random() * 3); i++) { // 3 to 5 random rare items
                            const randomSuperReward = superCoinRewards[Math.floor(Math.random() * superCoinRewards.length)];
                            playerObj.totalValue += randomSuperReward.value;
                            if (playerObj.id === 'you_0') playerBalance += randomSuperReward.value; // Only update main player's balance
                            playerObj.itemsWon.push(randomSuperReward);
                        }
                        playerBalanceSpan.textContent = playerBalance;
                        playerScoreSpan.textContent = `$${playerObj.totalValue}`; // Update player's individual score display
                        updateTeamTotalScoresDisplay(); // Update team totals

                        // Short delay for SUPER COIN reveal, then resolve
                        setTimeout(() => {
                            if (winnerCard) {
                                winnerCard.classList.remove('winner');
                            }
                            resolve({ superCoinHit: true, player: playerObj, item: winningItem });
                        }, 2500); 
                    } else {
                        playerObj.totalValue += winningItem.value;
                        if (playerObj.id === 'you_0') playerBalance += winningItem.value; // Only update main player's balance
                        playerBalanceSpan.textContent = playerBalance;
                        playerObj.itemsWon.push(winningItem); // Store result for current player

                        playerResultEl.textContent = `${playerObj.name} won ${winningItem.name} worth ${winningItem.value} Coins!`;
                        playerResultEl.style.color = getItemRarityColor(winningItem.rarity);
                        playerResultEl.classList.add('visible', 'success');

                        // Remove winner highlight after a short delay
                        setTimeout(() => {
                            if (winnerCard) {
                                winnerCard.classList.remove('winner');
                            }
                            playerScoreSpan.textContent = `$${playerObj.totalValue}`; // Update player's individual score display
                            updateTeamTotalScoresDisplay(); // Update team totals
                            resolve({ superCoinHit: false, player: playerObj, item: winningItem });
                        }, 2000); 
                    }
                }, { once: true });
            });
        }

        // Function to start the sequential battle
        async function startBattleSequence() {
            const totalCost = selectedCases.reduce((sum, c) => sum + c.price, 0);

            if (selectedCases.length === 0) {
                alert("Please select at least one case for the battle!");
                return;
            }

            if (playerBalance < totalCost) {
                alert("You don't have enough coins to open these cases!");
                return;
            }

            // Reset scores and items for all players before battle
            [...currentGroupMembers.youSide, ...currentGroupMembers.opponentSide].forEach(p => {
                p.totalValue = 0;
                p.itemsWon = [];
            });
            battleResults = []; // Clear previous results for user's summary
            
            // Initial display of live scores (all zeros) and build player lanes
            updateLiveBattlePlayersDisplay();

            // Hide selection, show opening
            document.querySelector('.case-selection-section').style.display = 'none';
            document.querySelector('.group-code-section').style.display = 'none';
            openingSection.classList.add('active'); // Show opening section
            startBattleBtn.disabled = true; // Disable until all opens are done
            
            playerBalance -= totalCost; // Deduct total cost upfront for the main player
            playerBalanceSpan.textContent = playerBalance;
            
            const numCasesPerBattle = selectedCases.length;
            let superCoinTriggeredGlobal = false;

            // Iterate through the selected cases as "rounds"
            for (let i = 0; i < numCasesPerBattle; i++) {
                if (superCoinTriggeredGlobal) break; // Stop if SUPER COIN was hit in a previous round

                const openingsPromises = [];
                const caseForMainPlayer = selectedCases[i];
                const caseForOpponentsRound = cases[Math.floor(Math.random() * cases.length)]; // Random case for all opponents in this round

                // Collect promises for your team
                currentGroupMembers.youSide.forEach(player => {
                    const caseToOpen = (player.id === 'you_0') ? caseForMainPlayer : cases[Math.floor(Math.random() * cases.length)];
                    openingsPromises.push(openCaseForPlayer(player, caseToOpen));
                });

                // Collect promises for opponent team
                currentGroupMembers.opponentSide.forEach(opponent => {
                    openingsPromises.push(openCaseForPlayer(opponent, caseForOpponentsRound));
                });

                // Wait for all players to finish opening their case in this round
                const roundResults = await Promise.all(openingsPromises);

                // Check if any SUPER COIN was hit in this round
                if (roundResults.some(result => result.superCoinHit)) {
                    superCoinTriggeredGlobal = true;
                    console.log("A SUPER COIN was hit by one of the players, battle sequence interrupted.");
                    // The openCaseForPlayer already handles the UI for SUPER COIN winner and its rewards
                }

                if (!superCoinTriggeredGlobal && i < numCasesPerBattle - 1) { // Only pause if battle continues
                    await new Promise(resolve => setTimeout(resolve, 1500)); // Pause between rounds
                }
            }


            // Battle finished (or SUPER COIN already handled it), show results and declare winner
            openingSection.classList.remove('active');
            battleResultsSection.style.display = 'block';
            
            // Declare winner logic
            const yourTeamFinalScore = currentGroupMembers.youSide.reduce((sum, p) => sum + p.totalValue, 0);
            const opponentTeamFinalScore = currentGroupMembers.opponentSide.reduce((sum, p) => sum + p.totalValue, 0);
            
            let winnerMessage = '';
            if (yourTeamFinalScore > opponentTeamFinalScore) {
                winnerMessage = `Your Team Wins! Total: ${yourTeamFinalScore} vs ${opponentTeamFinalScore}`;
            } else if (opponentTeamFinalScore > yourTeamFinalScore) {
                winnerMessage = `Opponents Win! Total: ${opponentTeamFinalScore} vs ${yourTeamFinalScore}`;
            } else {
                winnerMessage = `It's a Tie! Total: ${yourTeamFinalScore} vs ${opponentTeamFinalScore}`;
            }

            finalWinnerDeclaration.textContent = winnerMessage;
            displayBattleResults(); // Only displays items won by your main player
            selectedCases = []; // Clear selected cases for next battle
            updateSelectedCasesList();
            updateTotalCost();
            startBattleBtn.disabled = false; // Re-enable for new selection
        }

        // Function to display final battle results (only for the main player's items)
        function displayBattleResults() {
            battleResultsGrid.innerHTML = ''; // Clear previous results

            // Only display items won by 'You' (player_id 'you_0')
            const mainPlayer = currentGroupMembers.youSide.find(p => p.id === 'you_0');
            battleResults = mainPlayer ? mainPlayer.itemsWon : []; // Update global battleResults for consistency

            if (battleResults.length === 0) {
                battleResultsGrid.innerHTML += '<p>No items received in this battle (or SUPER COIN was hit and changed the outcome).</p>';
                return;
            }
            battleResults.forEach(item => {
                const resultCard = document.createElement('div');
                resultCard.className = `result-item-card ${item.rarity}`;
                resultCard.innerHTML = `
                    <img src="${item.image}" onerror="this.onerror=null;this.src='https://placehold.co/80x80/3b3b6b/e0e0e0?text=Item';" alt="${item.name}">
                    <div class="item-name">${item.name}</div>
                    <div class="item-value">+${item.value} Coins</div>
                `;
                battleResultsGrid.appendChild(resultCard);
            });
        }

        // --- Group Code & Battle Mode Functions ---

        // Function for initial group setup display
        function updateSetupGroupMembersDisplay() {
            const playerYouSideDiv = setupGroupMembers.querySelector('.player-side.player-you');
            const playerOpponentsSideDiv = setupGroupMembers.querySelector('.player-side.player-opponents');

            playerYouSideDiv.innerHTML = '';
            playerOpponentsSideDiv.innerHTML = '';

            currentGroupMembers.youSide.forEach(player => {
                const playerSlot = document.createElement('span');
                playerSlot.className = 'player-slot you';
                playerSlot.textContent = player.name;
                playerYouSideDiv.appendChild(playerSlot);
            });

            currentGroupMembers.opponentSide.forEach(opponent => {
                const opponentSlot = document.createElement('span');
                opponentSlot.className = 'player-slot opponent';
                opponentSlot.textContent = opponent.name;
                playerOpponentsSideDiv.appendChild(opponentSlot);
            });
            console.log('Setup Group members display updated. Your side:', currentGroupMembers.youSide.length, 'Opponent side:', currentGroupMembers.opponentSide.length);
        }

        // Function for live battle display during case openings
        function updateLiveBattlePlayersDisplay() {
            battleLanesContainer.innerHTML = ''; // Clear existing lanes

            // Create Your Team lane
            const youSideLane = document.createElement('div');
            youSideLane.className = 'player-side';
            youSideLane.style.flexDirection = 'column'; // Ensure vertical stacking
            youSideLane.style.gap = '20px'; // Space between player cards in a column

            // Create Opponent Team lane
            const opponentSideLane = document.createElement('div');
            opponentSideLane.className = 'player-side';
            opponentSideLane.style.flexDirection = 'column'; // Ensure vertical stacking
            opponentSideLane.style.gap = '20px'; // Space between player cards in a column


            // Add players to their respective lanes and store DOM references
            currentGroupMembers.youSide.forEach(player => {
                const playerLaneDiv = document.createElement('div');
                playerLaneDiv.className = 'battle-lane';
                playerLaneDiv.dataset.playerId = player.id;
                playerLaneDiv.innerHTML = `
                    <div class="player-header">
                        <span class="player-slot you">${player.name}</span>
                        <span class="player-score" data-player-score-id="${player.id}">$${player.totalValue}</span>
                    </div>
                    <div class="player-case-info">
                        <img class="player-current-case-image" src="https://placehold.co/80x80/FFD700/000000?text=CASE" alt="Case">
                        <div class="case-details">
                            <h3 class="player-current-case-name">Waiting...</h3>
                            <p>Price: <span class="player-current-case-price">0</span> Coins</p>
                        </div>
                    </div>
                    <div class="item-reel-wrapper">
                        <div class="reel-pointer"></div>
                        <div class="item-reel"></div>
                    </div>
                    <div class="player-result-message"></div>
                `;
                youSideLane.appendChild(playerLaneDiv);

                // Store DOM references in the player object for easy access
                player.caseImageEl = playerLaneDiv.querySelector('.player-current-case-image');
                player.caseNameEl = playerLaneDiv.querySelector('.player-current-case-name');
                player.casePriceEl = playerLaneDiv.querySelector('.player-current-case-price');
                player.itemReelEl = playerLaneDiv.querySelector('.item-reel');
                player.resultEl = playerLaneDiv.querySelector('.player-result-message');
                player.scoreSpanEl = playerLaneDiv.querySelector('.player-score');
            });

            currentGroupMembers.opponentSide.forEach(opponent => {
                const playerLaneDiv = document.createElement('div');
                playerLaneDiv.className = 'battle-lane';
                playerLaneDiv.dataset.playerId = opponent.id;
                playerLaneDiv.innerHTML = `
                    <div class="player-header">
                        <span class="player-slot opponent">${opponent.name}</span>
                        <span class="player-score" data-player-score-id="${opponent.id}">$${opponent.totalValue}</span>
                    </div>
                    <div class="player-case-info">
                        <img class="player-current-case-image" src="https://placehold.co/80x80/FFD700/000000?text=CASE" alt="Case">
                        <div class="case-details">
                            <h3 class="player-current-case-name">Waiting...</h3>
                            <p>Price: <span class="player-current-case-price">0</span> Coins</p>
                        </div>
                    </div>
                    <div class="item-reel-wrapper">
                        <div class="reel-pointer"></div>
                        <div class="item-reel"></div>
                    </div>
                    <div class="player-result-message"></div>
                `;
                opponentSideLane.appendChild(playerLaneDiv);

                // Store DOM references in the player object for easy access
                opponent.caseImageEl = playerLaneDiv.querySelector('.player-current-case-image');
                opponent.caseNameEl = playerLaneDiv.querySelector('.player-current-case-name');
                opponent.casePriceEl = playerLaneDiv.querySelector('.player-current-case-price');
                opponent.itemReelEl = playerLaneDiv.querySelector('.item-reel');
                opponent.resultEl = playerLaneDiv.querySelector('.player-result-message');
                opponent.scoreSpanEl = playerLaneDiv.querySelector('.player-score');
            });

            // Add the two team lanes to the main battle container
            battleLanesContainer.appendChild(youSideLane);
            battleLanesContainer.appendChild(opponentSideLane);

            // Update team total scores
            updateTeamTotalScoresDisplay();
        }

        function updateTeamTotalScoresDisplay() {
            const yourTeamTotalScore = currentGroupMembers.youSide.reduce((sum, p) => sum + p.totalValue, 0);
            const opponentTeamTotalScore = currentGroupMembers.opponentSide.reduce((sum, p) => sum + p.totalValue, 0);
            yourTeamScoreSpan.textContent = yourTeamTotalScore;
            opponentTeamScoreSpan.textContent = opponentTeamTotalScore;
        }


        function setBattleMode(mode) {
            console.log('Attempting to set battle mode to:', mode);
            // Reset player arrays
            currentGroupMembers.youSide = [];
            currentGroupMembers.opponentSide = [];

            // Populate player arrays based on mode
            currentGroupMembers.youSide.push({ id: 'you_0', name: 'You', totalValue: 0, itemsWon: [] });
            switch (mode) {
                case '1v1':
                    currentGroupMembers.opponentSide.push({ id: 'opp_0', name: 'Opponent 1', totalValue: 0, itemsWon: [] });
                    break;
                case '2v2':
                    currentGroupMembers.youSide.push({ id: 'you_1', name: 'Teammate 1', totalValue: 0, itemsWon: [] });
                    currentGroupMembers.opponentSide.push({ id: 'opp_0', name: 'Opponent 1', totalValue: 0, itemsWon: [] });
                    currentGroupMembers.opponentSide.push({ id: 'opp_1', name: 'Opponent 2', totalValue: 0, itemsWon: [] });
                    break;
                case '3v3':
                    currentGroupMembers.youSide.push({ id: 'you_1', name: 'Teammate 1', totalValue: 0, itemsWon: [] });
                    currentGroupMembers.youSide.push({ id: 'you_2', name: 'Teammate 2', totalValue: 0, itemsWon: [] });
                    currentGroupMembers.opponentSide.push({ id: 'opp_0', name: 'Opponent 1', totalValue: 0, itemsWon: [] });
                    currentGroupMembers.opponentSide.push({ id: 'opp_1', name: 'Opponent 2', totalValue: 0, itemsWon: [] });
                    currentGroupMembers.opponentSide.push({ id: 'opp_2', name: 'Opponent 3', totalValue: 0, itemsWon: [] });
                    break;
                default:
                    // Already initialized for 1v1 above
            }
            console.log('Battle mode set to:', mode, 'Your side players:', currentGroupMembers.youSide.length, 'Opponent side players:', currentGroupMembers.opponentSide.length);
            updateSetupGroupMembersDisplay(); // Update the pre-battle display
        }


        // --- Event Listeners ---

        startBattleBtn.addEventListener('click', startBattleSequence);

        backToSelectionBtn.addEventListener('click', () => {
            battleResultsSection.style.display = 'none';
            document.querySelector('.case-selection-section').style.display = 'block';
            document.querySelector('.group-code-section').style.display = 'block';
            startBattleBtn.disabled = false; // Re-enable for new selection
            battleLanesContainer.innerHTML = ''; // Clear battle lanes when going back
            finalWinnerDeclaration.textContent = ''; // Clear winner message
        });

        createGroupCodeBtn.addEventListener('click', () => {
            currentGroupCode = predefinedGroupCodes[Math.floor(Math.random() * predefinedGroupCodes.length)];
            myGroupCodeDisplay.textContent = `Your Group Code: ${currentGroupCode}`;
            myGroupCodeDisplay.style.display = 'block';
            groupMessage.textContent = 'Share this code with friends!';
            groupMessage.classList.remove('error');
            groupMessage.classList.add('success');
            
            // Set players based on current selected mode and update setup display
            const selectedMode = document.querySelector('input[name="battleMode"]:checked').value;
            setBattleMode(selectedMode);
        });

        joinGroupBtn.addEventListener('click', () => {
            const inputCode = joinGroupInput.value.trim().toUpperCase();
            if (predefinedGroupCodes.includes(inputCode)) {
                currentGroupCode = inputCode;
                groupMessage.textContent = `Joined group with code: ${inputCode}`;
                groupMessage.classList.remove('error');
                groupMessage.classList.add('success');
                myGroupCodeDisplay.textContent = `Current Group Code: ${inputCode}`;
                myGroupCodeDisplay.style.display = 'block';

                // Set players based on current selected mode and update setup display
                const selectedMode = document.querySelector('input[name="battleMode"]:checked').value;
                setBattleMode(selectedMode);
            } else {
                groupMessage.textContent = 'Invalid code. Try again.';
                groupMessage.classList.remove('success');
                groupMessage.classList.add('error');
                myGroupCodeDisplay.style.display = 'none';
                currentGroupCode = null;
                // Reset to default 1v1 if join fails
                setBattleMode('1v1');
            }
        });

        // Event listener for battle mode radio buttons
        battleModeRadios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                setBattleMode(event.target.value);
            });
        });

        // --- Initial setup ---
        populateCaseSelection();
        updateSelectedCasesList();
        updateTotalCost();
        // Initialize player arrays and displays based on default 1v1 mode
        setBattleMode('1v1'); 
