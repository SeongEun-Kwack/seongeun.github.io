/* =========================================================
   1. Templates (공통 헬퍼)
   ========================================================= */
function asset(label, source, imagePath = "", wireframeHtml = "") {
  return `
    <div class="asset">
      ${
        wireframeHtml
          ? wireframeHtml
          : imagePath
            ? `<img src="${imagePath}" alt="${label}">`
            : `
              <strong>원본 UI WireFrame 삽입 영역</strong>
              <span>${label}<br>${source}</span>
            `
      }
    </div>
  `;
}

function card(title, content) {
  return `
    <div class="card">
      ${title ? `<h3>${title}</h3>` : ""}
      ${content}
    </div>
  `;
}

function table(headers, rows, className = "") {
  return `
    <table class="${className}">
      <tr>
        ${headers.map((header) => `<th>${header}</th>`).join("")}
      </tr>
      ${rows.map((row) => `
        <tr>
          ${row.map((cell) => `<td>${cell}</td>`).join("")}
        </tr>
      `).join("")}
    </table>
  `;
}

function polarityIcon(fileName, alt) {
  return `
    <img
      class="polarity-icon"
      src="https://wiki.warframe.com/w/Special:FilePath/${fileName}?width=64"
      alt="${alt}"
      onerror="this.style.display='none'"
    >
  `;
}

/* =========================================================
   2. Wireframes (와이어프레임 생성기)
   ========================================================= */
function createModCard({
  name = "SERRATION",
  drain = "14",
  polarity = "V",
  effect = "기본 피해량 증가 +165%",
  compatibility = "RIFLE · PRIMARY",
  rarityPips = 3,
  filledRank = 10,
  preview = false
} = {}) {
  const rarityMarkup = Array.from(
    { length: rarityPips },
    function () {
      return "<span></span>";
    }
  ).join("");

  const rankMarkup = Array.from(
    { length: 10 },
    function (_, index) {
      return `
        <span class="${index < filledRank ? "is-filled" : ""}"></span>
      `;
    }
  ).join("");

  return `
    <div class="wf-mod-card-v2 ${preview ? "wf-mod-card-preview" : ""}">
      <div class="wf-card-header">
        <div
          class="wf-card-rarity-pips"
          data-guide-target="rarity"
        >
          ${rarityMarkup}
        </div>

        <div class="wf-card-meta-row">
          <div
            class="wf-card-drain"
            data-guide-target="drain"
          >
            ${drain}
          </div>

          <div
            class="wf-card-polarity"
            data-guide-target="polarity"
          >
            ${polarity}
          </div>
        </div>
      </div>

      <div
        class="wf-card-art"
        data-guide-target="art"
      >
        <strong>MOD ART</strong>
        <span>IconPath</span>
      </div>

      <div
        class="wf-card-name"
        data-guide-target="name"
      >
        ${name}
      </div>

      <div
        class="wf-card-effect"
        data-guide-target="effect"
      >
        ${effect}
      </div>

      <div class="wf-card-rank-label">
        RANK ${filledRank} / 10
      </div>

      <div class="wf-card-rank">
        ${rankMarkup}
      </div>

      <div
        class="wf-card-compatibility"
        data-guide-target="compatibility"
      >
        ${compatibility}
      </div>
    </div>
  `;
}

const BasicCardGuide = `
  <div class="wf-mod-guide">
    <svg
      class="wf-guide-lines"
      aria-hidden="true"
      viewBox="0 0 1 1"
    ></svg>

    <div
      class="wf-guide-note wf-note-rarity"
      data-guide-for="rarity"
    >
      <strong>Rarity</strong>
      <span>희귀도 타입</span>
      <span>예: Rare ●●●</span>
    </div>

    <div
      class="wf-guide-note wf-note-drain"
      data-guide-for="drain"
    >
      <strong>Drain</strong>
      <span>현재 Capacity 소모량</span>
      <span>BaseDrain · Rank · MaxRank</span>
    </div>

    <div
      class="wf-guide-note wf-note-art"
      data-guide-for="art"
    >
      <strong>Mod Art</strong>
      <span>IconPath</span>
    </div>

    <div
      class="wf-guide-note wf-note-name"
      data-guide-for="name"
    >
      <strong>Mod Name</strong>
      <span>ModName</span>
      <span>ModName_KR</span>
    </div>

    <div
      class="wf-guide-note wf-note-effect"
      data-guide-for="effect"
    >
      <strong>Effect</strong>
      <span>Description · AbilityType</span>
      <span>BaseEffect · EffectPerRank</span>
    </div>

    ${createModCard({
      name: "SERRATION",
      drain: "14",
      polarity: "V",
      effect: "기본 피해량 증가 +165%",
      compatibility: "RIFLE · PRIMARY",
      rarityPips: 3,
      filledRank: 10
    })}

    <div
      class="wf-guide-note wf-note-polarity"
      data-guide-for="polarity"
    >
      <strong>Polarity</strong>
      <span>예: Madurai V</span>
    </div>

    <div
      class="wf-guide-note wf-note-compatibility"
      data-guide-for="compatibility"
    >
      <strong>Compatibility</strong>
      <span>EquipType · Weapon</span>
      <span>SlotType · 일반 슬롯</span>
    </div>
  </div>
`;

const serrationCard = `
  <div class="wf-mod-card-preview-wrap">
    ${createModCard({
      name: "SERRATION",
      drain: "14",
      polarity: "V",
      effect: "기본 피해량 증가 +165%",
      compatibility: "RIFLE · PRIMARY",
      rarityPips: 3,
      filledRank: 10,
      preview: true
    })}
  </div>
`;

function modLoadoutWireframe() {
  const slot = function ({
    type = "일반",
    polarity = "+",
    modName = "",
    drain = "",
    selected = false,
    locked = false,
    extraClass = "",
    guideTarget = ""
  } = {}) {
    return `
      <div
        class="
          wf-slot
          ${selected ? "is-selected" : ""}
          ${locked ? "is-locked" : ""}
          ${extraClass}
        "
        ${guideTarget ? `data-loadout-target="${guideTarget}"` : ""}
      >
        <span class="wf-slot-type">${type}</span>
        <strong class="wf-slot-polarity">${polarity}</strong>
        ${modName ? `<span class="wf-slot-mod">${modName}</span>` : ""}
        ${drain ? `<span class="wf-slot-drain">${drain}</span>` : ""}
      </div>
    `;
  };

  const modItem = function ({
    name,
    rank,
    drain,
    polarity,
    compatible = true,
    disabled = false
  } = {}) {
    return `
      <div
        class="
          wf-mod-list-item
          ${compatible ? "is-compatible" : ""}
          ${disabled ? "is-disabled" : ""}
        "
      >
        <div class="wf-mod-item-top">
          <span class="wf-mod-pips">◆ ◆ ◆</span>
          <span>${polarity}</span>
        </div>

        <strong>${name}</strong>

        <div class="wf-mod-item-bottom">
          <span>R${rank}</span>
          <b>${drain}</b>
        </div>
      </div>
    `;
  };

  return `
    <div class="wf-loadout-guide">
      <div class="wf-screen">
        <header
          class="wf-header"
          data-loadout-target="header"
        >
          <div class="wf-header-left">
            <button class="wf-back" type="button">←</button>
            <strong class="wf-screen-title">MOD 장착</strong>
            <span class="wf-equipment-name">
              BRATON PRIME · 랭크 30
            </span>
          </div>

          <div class="wf-header-right">
            <div class="wf-capacity">
              <span>수용량</span>
              <strong>46 / 60</strong>

              <div class="wf-capacity-bar">
                <div class="wf-capacity-fill"></div>
              </div>
            </div>
          </div>
        </header>

        <div class="wf-content">
          <section class="wf-loadout-area">
            <strong class="wf-slots-title">MOD SLOTS</strong>

            <div
              class="wf-slot-row"
              data-loadout-target="slots"
            >
              ${slot({
                type: "AURA",
                polarity: "—",
                extraClass: "is-aura"
              })}

              ${slot({
                type: "일반",
                polarity: "V",
                modName: "SERRATION",
                drain: "14"
              })}

              ${slot({
                type: "일반",
                polarity: "V",
                modName: "SPLIT CHAMBER",
                drain: "15"
              })}

              ${slot({
                type: "일반",
                polarity: "—",
                modName: "VITAL SENSE",
                drain: "12"
              })}

              ${slot({
                type: "일반",
                polarity: "V",
                modName: "POINT STRIKE",
                drain: "9"
              })}

              ${slot({
                type: "일반",
                polarity: "+",
                guideTarget: "interaction"
              })}

              ${slot({
                type: "일반",
                polarity: "+"
              })}

              ${slot({
                type: "일반",
                polarity: "+"
              })}

              ${slot({
                type: "EXILUS",
                polarity: "+",
                extraClass: "is-exilus",
                locked: true
              })}

              ${slot({
                type: "ARCANE",
                polarity: "+",
                locked: true
              })}
            </div>

            <div class="wf-preview">
              <div class="wf-preview-card">
                <div>
                  <strong>장비 정보</strong><br>
                  <span>주무기 · Rifle</span><br>
                  <span>장착된 MOD 4 / 8</span>
                </div>
              </div>

              <div class="wf-preview-info">
                <strong>기본 장착 상태</strong>
                <p>일반 슬롯: 8</p>
                <p>엑실러스 슬롯: 1 (잠김)</p>
                <p>아케인 슬롯: 1 (잠김)</p>

                <div class="wf-preview-calculation">
                  <p>사용 수용량: 46 / 60</p>
                  <p>남은 수용량: 14</p>
                  <p><b>빈 슬롯을 선택해 MOD를 장착합니다.</b></p>
                </div>
              </div>
            </div>
          </section>

          <section
            class="wf-mod-list"
            data-loadout-target="list"
          >
            <strong class="wf-list-title">보유 MOD</strong>

            <div
              class="wf-toolbar"
              data-loadout-target="toolbar"
            >
              <button class="wf-filter is-active" type="button">전체</button>
              <button class="wf-filter" type="button">주무기</button>
              <button class="wf-sort" type="button">소모량 ↓</button>

              <input
                class="wf-search"
                type="text"
                placeholder="모드 검색"
              >
            </div>

            <div class="wf-mod-grid">
              ${modItem({
                name: "SERRATION",
                rank: "10",
                drain: "14",
                polarity: "V"
              })}

              ${modItem({
                name: "SPLIT CHAMBER",
                rank: "10",
                drain: "15",
                polarity: "V"
              })}

              ${modItem({
                name: "VITAL SENSE",
                rank: "10",
                drain: "12",
                polarity: "—"
              })}

              ${modItem({
                name: "POINT STRIKE",
                rank: "10",
                drain: "9",
                polarity: "V"
              })}

              ${modItem({
                name: "HEAVY CALIBER",
                rank: "10",
                drain: "14",
                polarity: "V"
              })}

              ${modItem({
                name: "REDIRECTION",
                rank: "10",
                drain: "14",
                polarity: "D",
                compatible: false,
                disabled: true
              })}

              ${modItem({
                name: "INTENSIFY",
                rank: "5",
                drain: "11",
                polarity: "V",
                compatible: false,
                disabled: true
              })}

              ${modItem({
                name: "FLOW",
                rank: "5",
                drain: "9",
                polarity: "D",
                compatible: false,
                disabled: true
              })}
            </div>
          </section>
        </div>

        <span class="wf-screen-note">
          슬롯 선택 → 호환 MOD 필터링 → 장착
        </span>
      </div>

      <aside class="wf-loadout-guide-notes">
        <div
          class="wf-loadout-note"
          data-loadout-guide-for="header"
        >
          <strong>상단 헤더</strong>
          <p>
            장비명, 랭크, 현재 수용량과 수용량 게이지를 표시한다.
          </p>
        </div>

        <div
          class="wf-loadout-note"
          data-loadout-guide-for="slots"
        >
          <strong>슬롯 영역</strong>
          <p>
            Aura 1칸, 일반 슬롯 7칸, Exilus 1칸,
            Arcane 1칸으로 구성한다.
          </p>
        </div>

        <div
          class="wf-loadout-note"
          data-loadout-guide-for="toolbar"
        >
          <strong>필터 · 정렬 · 검색</strong>
          <p>
            장비 유형 필터, 소모량 정렬, 이름 검색으로
            보유 MOD를 탐색한다.
          </p>
        </div>

        <div
          class="wf-loadout-note"
          data-loadout-guide-for="list"
        >
          <strong>보유 MOD 목록</strong>
          <p>
            이름, 랭크, 극성, 소모량과
            현재 장비에 대한 호환 여부를 표시한다.
          </p>
        </div>

        <div
          class="wf-loadout-note"
          data-loadout-guide-for="interaction"
        >
          <strong>장착 플로우</strong>
          <p>
            빈 슬롯을 선택하면 해당 슬롯과 장비에
            호환되는 MOD를 기준으로 다음 화면을 연다.
          </p>
        </div>
      </aside>

      <svg
        class="wf-loadout-guide-lines"
        aria-hidden="true"
        viewBox="0 0 1 1"
      ></svg>
    </div>
  `;
}

function modSlotPreviewWireframe() {
  return `
    <div class="wf-state-screen wf-slot-preview-screen">
      <header class="wf-state-header">
        <div class="wf-header-left">
          <button class="wf-back" type="button">←</button>
          <strong class="wf-screen-title">MOD 장착</strong>
          <span class="wf-equipment-name">BRATON PRIME · 랭크 30</span>
        </div>

        <div class="wf-header-right">
          <div class="wf-capacity">
            <span>수용량</span>
            <strong>46 → 51 / 60</strong>
            <div class="wf-capacity-bar">
              <div class="wf-capacity-fill wf-capacity-fill-preview"></div>
            </div>
          </div>
        </div>
      </header>

      <div class="wf-state-body">
        <section class="wf-state-slots">
          <strong class="wf-slots-title">MOD SLOTS</strong>

          <div class="wf-state-slot-row">
            <div class="wf-state-slot is-aura">
              <span>AURA</span>
              <b>—</b>
            </div>

            <div class="wf-state-slot is-equipped">
              <span>일반</span>
              <b>V</b>
              <small>SERRATION</small>
              <em>14</em>
            </div>

            <div class="wf-state-slot is-equipped">
              <span>일반</span>
              <b>V</b>
              <small>SPLIT<br>CHAMBER</small>
              <em>15</em>
            </div>

            <div class="wf-state-slot is-equipped">
              <span>일반</span>
              <b>—</b>
              <small>VITAL<br>SENSE</small>
              <em>12</em>
            </div>

            <div
              class="wf-state-slot is-selected"
              data-state-guide-target="selected-slot"
            >
              <span>일반</span>
              <b>V</b>
              <small>선택됨</small>
              <em>+</em>
            </div>

            <div class="wf-state-slot">
              <span>일반</span>
              <b>+</b>
            </div>

            <div class="wf-state-slot">
              <span>일반</span>
              <b>+</b>
            </div>
          </div>

          <div class="wf-selected-slot-panel">
            <div class="wf-selected-slot-icon">V</div>

            <div class="wf-selected-slot-copy">
              <strong>선택 슬롯</strong>
              <p>슬롯 유형: <b>일반 슬롯</b></p>
              <p>슬롯 극성: <b>V (마두라이)</b></p>
              <p>장비 유형: <b>주무기 · Rifle</b></p>
            </div>

            <div class="wf-selected-slot-rule">
              <strong>필터 규칙</strong>
              <p>
                일반 슬롯에 장착 가능한 Rifle MOD만 표시한다.
                동일 MOD 및 ConflictGroup 중복 여부도 확인한다.
              </p>
            </div>
          </div>
        </section>

        <section class="wf-state-mod-panel">
          <div class="wf-state-panel-heading">
            <div>
              <strong>장착 프리뷰</strong>
              <span>선택 MOD · POINT STRIKE</span>
            </div>

            <span class="wf-result-count">호환 가능</span>
          </div>

          <div class="wf-preview-mod-layout">
            <div class="wf-preview-mod-card">
              <span class="wf-preview-mod-rarity">◆ ◆ ◆</span>
              <span class="wf-preview-mod-polarity">V</span>
              <div class="wf-preview-mod-art">
                <strong>MOD ART</strong>
                <span>IconPath</span>
              </div>
              <strong>POINT STRIKE</strong>
              <small>크리티컬 확률 증가 +150%</small>
              <span>RANK 10 / 10 · Drain 9</span>
            </div>

            <div class="wf-preview-mod-info">
              <div>
                <span>대상 슬롯</span>
                <strong>일반 · V 극성</strong>
              </div>

              <div>
                <span>극성 일치</span>
                <strong>일치</strong>
              </div>

              <div>
                <span>기본 소모량</span>
                <strong>9</strong>
              </div>

              <div>
                <span>실제 소모량</span>
                <strong>⌈9 × 0.5⌉ = 5</strong>
              </div>

              <div class="wf-preview-capacity-change">
                <span>수용량 변화</span>
                <strong>46 / 60 → 51 / 60</strong>
              </div>
            </div>
          </div>

          <div class="wf-preview-action-row">
            <button type="button" class="is-primary">장착</button>
            <button type="button">취소</button>
          </div>

          <div
            class="wf-state-help wf-state-guide-note"
            data-state-guide-for="selected-slot"
          >
            <strong>선택 슬롯 → MOD 프리뷰</strong><br>
            슬롯의 극성과 MOD 극성을 비교한 뒤 실제 Drain을 계산한다.
            장착 전 예상 수용량도 함께 표시한다.
          </div>
        </section>
      </div>

      <svg
        class="wf-state-guide-lines"
        aria-hidden="true"
        viewBox="0 0 1 1"
      ></svg>
    </div>
  `;
}

function modCapacityErrorWireframe() {
  return `
    <div class="wf-state-screen wf-capacity-error-screen">
      <header class="wf-state-header">
        <div class="wf-header-left">
          <button class="wf-back" type="button">←</button>
          <strong class="wf-screen-title">MOD 장착</strong>
          <span class="wf-equipment-name">BRATON PRIME · 랭크 30</span>
        </div>

        <div class="wf-header-right">
          <div class="wf-capacity wf-capacity-error">
            <span>수용량</span>
            <strong>58 / 60</strong>
            <div class="wf-capacity-bar">
              <div class="wf-capacity-fill is-near-limit"></div>
            </div>
          </div>
        </div>
      </header>

      <div class="wf-state-body">
        <section class="wf-state-slots">
          <strong class="wf-slots-title">MOD SLOTS</strong>

          <div class="wf-state-slot-row">
            <div class="wf-state-slot is-aura">
              <span>AURA</span>
              <b>—</b>
            </div>

            <div class="wf-state-slot is-equipped">
              <span>일반</span>
              <b>V</b>
              <small>SERRATION</small>
              <em>14</em>
            </div>

            <div class="wf-state-slot is-equipped">
              <span>일반</span>
              <b>V</b>
              <small>SPLIT<br>CHAMBER</small>
              <em>15</em>
            </div>

            <div class="wf-state-slot is-equipped">
              <span>일반</span>
              <b>—</b>
              <small>VITAL<br>SENSE</small>
              <em>12</em>
            </div>

            <div class="wf-state-slot is-equipped">
              <span>일반</span>
              <b>V</b>
              <small>POINT<br>STRIKE</small>
              <em>9</em>
            </div>

            <div class="wf-state-slot is-error-target">
              <span>일반</span>
              <b>V</b>
              <small>장착 시도</small>
              <em>14</em>
            </div>
          </div>

          <div class="wf-capacity-summary">
            <div>
              <span>현재 사용량</span>
              <strong>58 / 60</strong>
            </div>

            <div>
              <span>추가 MOD 소모량</span>
              <strong>+14</strong>
            </div>

            <div class="is-error">
              <span>장착 후 예상 수용량</span>
              <strong>72 / 60</strong>
            </div>
          </div>
        </section>

        <section class="wf-state-mod-panel">
          <div class="wf-state-panel-heading">
            <div>
              <strong>장착 시도 MOD</strong>
              <span>선택 슬롯: 일반 · V 극성</span>
            </div>
          </div>

          <div class="wf-error-mod-preview">
            <div class="wf-error-mod-card">
              <span class="wf-state-mod-polarity">V</span>
              <strong>HEAVY CALIBER</strong>
              <small>R10 · 소모량 14</small>
              <p>기본 피해량 증가 +165%</p>
            </div>

            <div class="wf-error-calculation">
              <p>현재 수용량: <b>58 / 60</b></p>
              <p>추가 소모량: <b>+14</b></p>
              <p class="is-error">장착 후: <b>72 / 60</b></p>
            </div>
          </div>

          <div class="wf-error-message">
            <strong>수용량이 부족하여 MOD를 장착할 수 없습니다.</strong>
            <p>
              12만큼의 추가 수용량이 필요합니다.
              장비 랭크를 올리거나 Orokin Reactor를 적용하거나,
              기존 MOD의 랭크를 낮추세요.
            </p>

            <div class="wf-error-actions">
              <button type="button">확인</button>
              <button type="button" class="is-secondary">
                MOD 랭크 조정
              </button>
            </div>
          </div>
        </section>
      </div>

      <svg
        class="wf-state-guide-lines"
        aria-hidden="true"
        viewBox="0 0 1 1"
      ></svg>
    </div>
  `;
}

function fusionModCard({
  rank = 5,
  effect = "+90%",
  drain = 9,
  muted = false
} = {}) {
  const dots = Array.from({ length: 10 }, function (_, index) {
    return `<span class="${index < rank ? "is-filled" : ""}"></span>`;
  }).join("");

  return `
    <div class="wf-fusion-mod-card ${muted ? "is-muted" : ""}">
      <div class="wf-fusion-rarity">◆ ◆ ◆</div>

      <div class="wf-fusion-art">
        <strong>MOD ART</strong>
        <span>IconPath</span>
      </div>

      <strong class="wf-fusion-card-name">SERRATION</strong>
      <span class="wf-fusion-card-effect">기본 피해량 증가 ${effect}</span>
      <span class="wf-fusion-card-meta">소모 ${drain} · 극성 V</span>

      <div class="wf-fusion-rank-dots">
        ${dots}
      </div>

      <span class="wf-fusion-rank-label">RANK ${rank} / 10</span>
    </div>
  `;
}

function modFusionWireframe() {
  return `
    <div class="wf-fusion-screen">
      <header class="wf-fusion-header">
        <div class="wf-fusion-header-left">
          <button class="wf-back" type="button">←</button>
          <strong class="wf-screen-title">MOD 합성</strong>
        </div>

        <div class="wf-fusion-resources">
          <span>엔도 <b>45,000</b></span>
          <span>크레딧 <b>2,500,000</b></span>
        </div>
      </header>

      <div class="wf-fusion-body">
        <section class="wf-fusion-card-panel">
          <strong class="wf-fusion-panel-title">합성 대상 MOD</strong>
          ${fusionModCard({
            rank: 5,
            effect: "+90%",
            drain: 9
          })}
          <p class="wf-fusion-card-caption">
            현재 선택된 모드의 랭크·효과·소모량을 표시합니다.
          </p>
        </section>

        <section class="wf-fusion-settings-panel">
          <div class="wf-fusion-panel-heading">
            <strong>합성 설정</strong>
            <span>현재 Rank 5</span>
          </div>

          <div class="wf-fusion-stat-grid">
            <div>
              <span>현재 효과</span>
              <b>+90%</b>
            </div>
            <div>
              <span>현재 소모</span>
              <b>9</b>
            </div>
            <div>
              <span>목표 Rank</span>
              <b>8</b>
            </div>
            <div>
              <span>예상 소모</span>
              <b>12</b>
            </div>
          </div>

          <div class="wf-fusion-slider-area">
            <div class="wf-fusion-slider-label">
              <strong>목표 랭크 선택</strong>
              <span>5 → 8</span>
            </div>

            <div class="wf-fusion-slider-track">
              <span class="wf-fusion-slider-fill"></span>
              <i style="left:0%;"></i>
              <i style="left:20%;"></i>
              <i style="left:40%;"></i>
              <i class="is-selected" style="left:60%;"></i>
              <i style="left:80%;"></i>
              <i style="left:100%;"></i>
            </div>

            <div class="wf-fusion-slider-values">
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <b>8</b>
              <span>9</span>
              <span>10</span>
            </div>
          </div>

          <div class="wf-fusion-change-summary">
            <span>예상 효과</span>
            <strong>+90% → +135%</strong>
          </div>

          <table class="wf-fusion-cost-table">
            <tr>
              <th>랭크</th>
              <th>5→6</th>
              <th>6→7</th>
              <th class="is-target">7→8</th>
              <th class="is-future">8→9</th>
              <th class="is-future">9→10</th>
            </tr>
            <tr>
              <td>엔도</td>
              <td>960</td>
              <td>1,920</td>
              <td class="is-target">3,840</td>
              <td class="is-future">7,680</td>
              <td class="is-future">15,360</td>
            </tr>
            <tr>
              <td>크레딧</td>
              <td>46,368</td>
              <td>92,736</td>
              <td class="is-target">185,472</td>
              <td class="is-future">370,944</td>
              <td class="is-future">741,888</td>
            </tr>
          </table>

          <div class="wf-fusion-total-cost">
            <div>
              <span>누적 엔도 (5→8)</span>
              <strong>6,720</strong>
            </div>
            <div>
              <span>누적 크레딧 (5→8)</span>
              <strong>324,576</strong>
            </div>
          </div>

          <div class="wf-fusion-resource-check">
            <p>엔도 잔여 <b>45,000 − 6,720 = 38,280</b> ✓</p>
            <p>크레딧 잔여 <b>2,500,000 − 324,576 = 2,175,424</b> ✓</p>
          </div>

          <div class="wf-fusion-actions">
            <button type="button" class="is-primary">합성 실행</button>
            <button type="button">취소</button>
          </div>
        </section>
      </div>
    </div>
  `;
}

function modFusionConfirmWireframe() {
  return `
    <div class="wf-fusion-screen wf-fusion-confirm-screen">
      <header class="wf-fusion-header is-dimmed">
        <div class="wf-fusion-header-left">
          <button class="wf-back" type="button">←</button>
          <strong class="wf-screen-title">MOD 합성</strong>
        </div>

        <div class="wf-fusion-resources">
          <span>엔도 <b>45,000</b></span>
          <span>크레딧 <b>2,500,000</b></span>
        </div>
      </header>

      <div class="wf-fusion-confirm-background">
        <div class="wf-fusion-confirm-ghost-card"></div>
        <div class="wf-fusion-confirm-ghost-panel"></div>
      </div>

      <div class="wf-fusion-popup-overlay">
        <section class="wf-fusion-popup">
          <strong class="wf-fusion-popup-title">합성 확인</strong>

          <div class="wf-fusion-popup-row">
            <span>대상 MOD</span>
            <b>SERRATION</b>
          </div>
          <div class="wf-fusion-popup-row">
            <span>랭크 변화</span>
            <b>5 → 8</b>
          </div>
          <div class="wf-fusion-popup-row">
            <span>효과 변화</span>
            <b>+90% → +135%</b>
          </div>
          <div class="wf-fusion-popup-row">
            <span>소모 변화</span>
            <b>9 → 12</b>
          </div>

          <div class="wf-fusion-popup-divider"></div>

          <div class="wf-fusion-popup-row">
            <span>소비 엔도</span>
            <b>6,720</b>
          </div>
          <div class="wf-fusion-popup-row">
            <span>소비 크레딧</span>
            <b>324,576</b>
          </div>

          <p class="wf-fusion-popup-warning">
            합성은 되돌릴 수 없습니다.
          </p>

          <div class="wf-fusion-popup-actions">
            <button type="button" class="is-primary">확인</button>
            <button type="button">취소</button>
          </div>
        </section>
      </div>
    </div>
  `;
}

function modFusionResultWireframe() {
  return `
    <div class="wf-fusion-screen wf-fusion-result-screen">
      <header class="wf-fusion-header">
        <div class="wf-fusion-header-left">
          <button class="wf-back" type="button">←</button>
          <strong class="wf-screen-title">MOD 합성</strong>
        </div>

        <div class="wf-fusion-resources">
          <span>엔도 <b>38,280</b></span>
          <span>크레딧 <b>2,175,424</b></span>
        </div>
      </header>

      <div class="wf-fusion-result-body">
        <div class="wf-fusion-animation-placeholder">
          <strong>합성 애니메이션 영역</strong>
          <span>카드 발광 → 랭크 점 순차 점등 → 강화 완료</span>
        </div>

        <strong class="wf-fusion-complete-title">합성 완료!</strong>

        <div class="wf-fusion-before-after">
          <div class="wf-fusion-before">
            <span>BEFORE</span>
            ${fusionModCard({
              rank: 5,
              effect: "+90%",
              drain: 9,
              muted: true
            })}
          </div>

          <div class="wf-fusion-result-arrow">→</div>

          <div class="wf-fusion-after">
            <span>AFTER</span>
            ${fusionModCard({
              rank: 8,
              effect: "+135%",
              drain: 12
            })}
          </div>
        </div>

        <div class="wf-fusion-result-summary">
          <span>RANK 5 → 8</span>
          <span>효과 +90% → +135%</span>
          <span>소모 9 → 12</span>
        </div>

        <button type="button" class="wf-fusion-result-confirm">
          확인
        </button>
      </div>
    </div>
  `;
}


/* =========================================================
   3. Slides (전체 슬라이드 데이터)
   ========================================================= */
window.slides = [
  {
    eyebrow: "곽성은 역기획서 포트폴리오",
    html: `
      <h1>워프레임<br>MOD 시스템 역기획서</h1>
      <p class="subtitle">워프레임 MOD 시스템/UI WireFrame</p>
      <p class="title-foot">연결 문서: (역기획서) 워프레임 MOD 시스템-상세</p>
    `
  },
  {
    eyebrow: "01. Overview",
    title: "1-1. 한 줄 요약",
    html: `
      <p class="quote">
        워프레임의 모드 시스템은
        <br>카드 형태의 모드를 장비 슬롯에 장착하여
        <br>능력치를 커스터마이징하는 빌드 시스템이다.
      </p>

      <div class="flow">
        <div class="flow-box">모드 획득</div><div class="arrow">→</div>
        <div class="flow-box">장착</div><div class="arrow">→</div>
        <div class="flow-box">합성</div><div class="arrow">→</div>
        <div class="flow-box">변환</div><div class="arrow">→</div>
        <div class="flow-box">극성 변경</div>
      </div>

      <p class="note">
        모드 획득 → 장착 → 합성 → 변환 → 극성 변경의 순환 루프를 통해
        플레이어의 장기 성장과 전략적 다양성을 동시에 지원한다.
      </p>
    `
  },
  {
    eyebrow: "01. Overview",
    title: "1-2. 외부 시스템 관계도",
    html: `
      <div class="system-map">
        <svg
          class="system-map-lines"
          viewBox="0 0 1000 560"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <marker
              id="system-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#000000"></path>
            </marker>
          </defs>

          <path d="M 255 87 L 365 190" class="system-line" marker-end="url(#system-arrow)"></path>
          <path d="M 500 168 L 500 62" class="system-line-dashed" marker-end="url(#system-arrow)"></path>
          <path d="M 745 87 L 635 190" class="system-line" marker-end="url(#system-arrow)"></path>
          <path d="M 745 294 L 635 230" class="system-line-dashed" marker-end="url(#system-arrow)"></path>
          <path d="M 635 245 L 745 300" class="system-line-dashed" marker-end="url(#system-arrow)"></path>
          <path d="M 365 255 L 255 473" class="system-line" marker-end="url(#system-arrow)"></path>
          <path d="M 500 442 L 500 280" class="system-line" marker-end="url(#system-arrow)"></path>
          <path d="M 745 473 L 635 258" class="system-line" marker-end="url(#system-arrow)"></path>
        </svg>

        <span class="system-line-label label-mission">공급 →</span>
        <span class="system-line-label label-battle">효과 적용 ↕ 전투 결과</span>
        <span class="system-line-label label-syndicate">← 공급</span>
        <span class="system-line-label label-orbiter">UI 연동 ↔</span>
        <span class="system-line-label label-trade">유통 ↓</span>
        <span class="system-line-label label-cost">비용 소비 ↑</span>
        <span class="system-line-label label-vendor">공급 →</span>

        <div class="system-node node-mission">
          <strong>미션 보상</strong>
          <span>드롭 테이블 기반<br>모드 드롭</span>
        </div>

        <div class="system-node node-battle">
          <strong>전투 시스템</strong>
          <span>효과 적용 대상<br>워프레임 · 무기 · 동반자</span>
        </div>

        <div class="system-node node-syndicate">
          <strong>신디케이트</strong>
          <span>평판 소비<br>모드 구매</span>
        </div>

        <div class="system-node node-orbiter">
          <strong>오비터 UI</strong>
          <span>무기고 진입점<br>모드 화면 호출</span>
        </div>

        <div class="system-node node-trade">
          <strong>플레이어 거래</strong>
          <span>리벤 · 프라임드<br>모드 유통</span>
        </div>

        <div class="system-node node-resource">
          <strong>엔도 · 크레딧</strong>
          <span>합성 · 변환 비용<br>게임 내 재화 순환</span>
        </div>

        <div class="system-node node-vendor">
          <strong>보이드 상인</strong>
          <span>프라임드 모드<br>한정 판매</span>
        </div>

        <div class="system-core">
          <strong>모드 시스템</strong>
          <span>(본 문서 범위)</span>

          <div class="system-core-actions">
            <b>장착</b>
            <b>합성</b>
            <b>변환</b>
            <b>포르마</b>
          </div>
        </div>
      </div>
    `
  },
  {
    eyebrow: "01. Overview",
    title: "1-3. 기획 의도",
    html: `
      <div class="grid-2">
        ${card(
          "1. 빌드 다양성 확보",
          `
            <p>
              동일한 워프레임이나 무기라도 장착하는 모드 조합에 따라
              완전히 다른 플레이 스타일 연출 가능. 데미지 특화, 생존 특화,
              어빌리티 특화 등 플레이어의 선택에 따라 캐릭터의 성격이 달라진다.
              <br>*Diablo 시리즈의 룬워드 시스템, Path of Exile의 패시브 트리와 동일한 성격
            </p>
          `
        )}

        ${card(
          "2. 장기 성장 동기 부여",
          `
            <p>
              모드를 최고 랭크까지 합성하려면 대량의 엔도와 크레딧 필요.
              <br>또한 포르마를 통해 극성을 최적화하려면 장비를 반복 레벨 필요.
              <br>이 반복 루프가 엔드게임 콘텐츠의 소비 사이클을 형성한다.
            </p>
          `
        )}

        ${card(
          "3. 경제 시스템 연동",
          `
            <p>
              트레이드 가능한 모드(특히 리벤 모드)는 플레이어 간 거래 경제의 핵심 재화로 기능.
              <br>커뮤니티 활성화와 장기 리텐션에 직접 기여한다.
            </p>
          `
        )}

        ${card(
          "4. 신규 유저 학습 곡선 설계",
          `
            <p>
              초반에는 단순한 모드 장착만으로 충분히 스펙업 가능.
              <br>단 진행할수록 극성 매칭, 수용량 관리, 세트 효과 등 복잡한 의사결정이 요구되어
              자연스러운 학습 곡선이 형성된다.
            </p>
          `
        )}
      </div>
    `
  },
  {
    eyebrow: "01. Overview",
    title: "1-4. 핵심 용어 정리",
    className: "terms-slide",
    html: `
      <div class="grid-2">
        ${card("모드(Mod)", "<p>장비에 장착하여 능력치를 변경하는 카드형 아이템</p>")}
        ${card("소모(Drain)", "<p>모드 1장이 소비하는 수용량 포인트</p>")}
        ${card("수용량(Capacity)", "<p>장비가 보유한 총 모드 장착 가능 포인트</p>")}
        ${card("극성(Polarity)", "<p>슬롯과 모드에 부여된 속성 심볼. 일치 시 소모 반감</p>")}
        ${card("합성(Fusion)", "<p>엔도+크레딧을 소비하여 모드 랭크를 올리는 강화</p>")}
        ${card("변환(Transmutation)", "<p>4장의 모드를 합쳐 랜덤 모드 1장을 생성</p>")}
        ${card("용해(Dissolve)", "<p>모드를 분해하여 엔도를 획득</p>")}
        ${card("포르마(Forma)", "<p>슬롯의 극성을 변경하는 소모 아이템 (장비 레벨 리셋)</p>")}
        ${card("오로킨 카탈리스트/리액터", "<p>장비의 최대 수용량을 2배로 올리는 소모 아이템</p>")}
        ${card("엔도(Endo)", "<p>합성에 사용되는 전용 재화</p>")}
      </div>
    `
  },
{
  eyebrow: "02. Mod Data System",
  title: "2-1. 모드 카드 속성 정의",
  className: "mod-card-definition-slide",
  html: `
    <div class="ui-layout">
      ${asset(
        "모드 카드 속성 정의",
        "UI 표시 요소와 ModTable 데이터 연결",
        "",
        BasicCardGuide
      )}

      <div class="ui-copy">
        ${card(
          "카드 UI와 데이터 필드 연결",
          `
            <p><b>Rarity</b> — 희귀도 및 카드 프레임 타입</p>
            <p><b>Drain</b> — BaseDrain, DrainPerRank, CurrentRank</p>
            <p><b>Polarity</b> — 슬롯 극성과 비교하는 심볼</p>
            <p><b>Mod Art</b> — IconPath 기반 카드 이미지</p>
            <p><b>Mod Name</b> — ModName / ModName_KR</p>
            <p><b>Effect</b> — AbilityType, BaseEffect, EffectPerRank</p>
            <p><b>Compatibility</b> — EquipType, SlotType</p>
          `
        )}

        ${card(
          "표시 규칙",
          `
            <p>
              카드 UI에는 플레이어가 판단에 필요한 정보만 노출한다.
              ID, ConflictGroup, 거래 가능 여부 같은 내부 검증 데이터는
              UI에 직접 표시하지 않는다.
            </p>
          `
        )}
      </div>
    </div>
  `
},


  {
    eyebrow: "02. Mod Data System",
    title: "2-2. 소모 계산 공식 / 2-3. 효과 계산 공식",
    html: `
      <div class="formula">
        현재 소모량 = BaseDrain + (DrainPerRank × CurrentRank)<br>
        예시: Serration — BaseDrain 4, DrainPerRank 1, Rank 10 →
        4 + (1 × 10) = 14 (총 14 소모)
      </div>

      <div class="formula">
        현재 효과 총합 = BaseEffect + (EffectPerRank × CurrentRank)<br>
        예시: Serration — BaseEffect 15%, EffectPerRank 15%, Rank 10 →
        15% + (15% × 10) = 165% (총 165% 상승)
      </div>
    `
  },
  {
    eyebrow: "02. Mod Data System",
    title: "2-4. Enum 정의",
    html: `
      <div class="grid-4">
        ${card(
          "Rarity (희귀도)",
          `
            <p>0 일반 Common <span class="rarity-color rarity-bronze">동색(Bronze)</span></p>
            <p>1 고급 Uncommon <span class="rarity-color rarity-silver">은색(Silver)</span></p>
            <p>2 희귀 Rare <span class="rarity-color rarity-gold">금색(Gold)</span></p>
            <p>3 전설 Legendary <span class="rarity-color rarity-platinum">백금(Platinum/White)</span></p>
            <p>10 리벤 Riven <span class="rarity-color rarity-purple">보라색(Purple)</span></p>
            <p>11 아말감 Amalgam 특수</p>
            <p>12 갈바나이즈드 Galvanized 특수</p>
          `
        )}

        ${card(
          "Polarity (극성)",
          `
            <p>0 마두라이 V</p>
            <p>1 바자린 D</p>
            <p>2 나라몬 —</p>
            <p>3 제누릭 =</p>
            <p>4 우나이루 F</p>
            <p>5 펜자가</p>
            <p>6 움브라</p>
            <p>9 없음</p>
          `
        )}

        ${card(
          "EquipType (장비 유형)",
          `
            <p>0 워프레임</p>
            <p>1 주무기</p>
            <p>2 보조무기</p>
            <p>3 근접무기</p>
            <p>4 동반자</p>
            <p>5 아크윙</p>
            <p>6 K-드라이브</p>
            <p>7 네크라메크</p>
            <p>8 레일잭</p>
          `
        )}

        ${card(
          "SlotType (슬롯 유형)",
          `
            <p>0 일반</p>
            <p>1 오라</p>
            <p>2 스탠스</p>
            <p>3 엑실러스</p>
            <p>4 아케인</p>
            <p>R / Y / U / —</p>
          `
        )}
      </div>
    `
  },
  {
    eyebrow: "02. Mod Data System",
    title: "2-5. ModTable / 2-6. SetModTable",
    html: `
      <div class="grid-2">
        <div>
          <h3>ModTable</h3>

          ${table(
            ["컬럼명", "타입", "설명"],
            [
              ["ModID", "CHAR", "고유 식별자"],
              ["ModName", "CHAR", "영문 이름"],
              ["ModName_KR", "CHAR", "한글 이름"],
              ["Rarity", "INT", "Enum_Rarity"],
              ["Polarity", "INT", "Enum_Polarity"],
              ["EquipType", "INT", "Enum_EquipType"],
              ["SlotType", "INT", "Enum_SlotType"],
              ["BaseDrain", "INT", "기본 소모"],
              ["DrainPerRank", "INT", "랭크당 추가 소모"],
              ["MaxRank", "INT", "최대 합성 랭크"],
              ["AbilityType", "CHAR", "능력치 종류"],
              ["BaseEffect", "FLOAT", "기본 수치"],
              ["EffectPerRank", "FLOAT", "랭크당 증가분"]
            ],
            "small"
          )}
        </div>

        <div>
          <h3>SetModTable</h3>

          ${table(
            ["컬럼명", "타입", "설명"],
            [
              ["SetID", "CHAR(50)", "세트 고유 식별자"],
              ["SetName", "CHAR", "세트 이름"],
              ["RequiredCount", "INT", "n세트 효과 발동 개수"],
              ["SetBonusType", "CHAR", "보너스 능력치 종류"],
              ["SetBonusValue", "FLOAT", "보너스 수치"],
              ["SetBonusDesc", "CHAR", "보너스 설명"]
            ],
            "small"
          )}

        <div class="mod-data-note">
          ${card("", `
            <p>
              실제로 나타나진 않으나 장착 규칙, 세트 연동, 거래,
              상세 정보에 사용되는 데이터:
            </p>
            <p>
              ConflictGroup / SetID / IsTradable / IconPath / Description
            </p>
          `)}
        </div>

        </div>
      </div>
    `
  },

{
  eyebrow: "02. Mod Data System",
  title: "2-7. 데이터 입력 예시 — Serration",
  className: "serration-data-slide",
  html: `
    <div class="ui-layout">
      <div class="serration-card-stage">
        ${asset(
          "Serration 예시 모드 카드",
          "ModTable 입력값으로 생성한 카드 UI",
          "",
          serrationCard
        )}
      </div>

      <div>
        ${table(
          ["컬럼", "값"],
          [
            ["ModID(*)", "MOD_SERRATION_001"],
            ["ModName", "Serration"],
            ["ModName_KR(*)", "톱날"],
            ["Rarity", "2 (희귀)"],
            ["Polarity", "0 (마두라이)"],
            ["EquipType", "1 (주무기)"],
            ["SlotType", "0 (일반)"],
            ["BaseDrain / DrainPerRank / MaxRank", "4 / 1 / 10"],
            ["AbilityType", "Damage"],
            ["BaseEffect / EffectPerRank", "15.0 / 15.0"],
            ["ConflictGroup(*)", "CONFLICT_SERRATION"],
            ["SetID(*) / IsTradable(*)", "NULL / TRUE"],
            ["Description", "기본 피해량 증가"]
          ],
          "small"
        )}

        <div class="card" style="margin-top:1vw;">
          <p>(*)표시 항목은 UI상에 표시되지 않음, 단 필요 데이터 참고</p>
        </div>
      </div>
    </div>
  `
},

  {
    eyebrow: "03. Mod Attachment System",
    title: "3-1. 슬롯 구조 / 3-2. 수용량(Capacity) 계산 규칙",
    html: `
      <div class="grid-2">
        <div>
          ${table(
            ["장비 유형", "일반", "오라", "스탠스", "엑실러스", "아케인", "합계"],
            [
              ["워프레임", "8", "1", "0", "1", "2", "12"],
              ["주무기", "8", "0", "0", "1", "0", "9"],
              ["보조무기", "8", "0", "0", "1", "0", "9"],
              ["근접무기", "8", "0", "1", "1", "0", "10"],
              ["동반자", "8", "0", "0", "0", "0", "8"]
            ]
          )}

          <p class="note">
            엑실러스 슬롯은 기본 잠금 상태이며,
            엑실러스 어댑터 아이템 소비 시 해금된다.
          </p>
        </div>

        ${card(
          "",
          `
            <p>* 기본 수용량 = 장비 레벨 (0~30)</p>
            <p>* 카탈리스트/리액터 적용 시 = 장비 레벨 × 2 (최대 60)</p>
            <br>
            <p>오라 슬롯과 스탠스 슬롯에 장착된 모드는 소모를 차감하지 않고, 오히려 수용량을 추가한다.</p>
            <p>추가 수용량 = 모드 소모값 (극성 일치 시 ×2, 불일치 시 ×0.8 반올림)</p>
            <p>예: 레벨 30 워프레임 + 리액터 + 오라 모드(소모 7, 극성 일치) <br>→ 60 + (7 × 2) = 74</p>
            <p>잔여 수용량 = 총 수용량 - Σ(장착된 각 모드의 실제 소모)</p>
            <p>잔여 수용량이 0 미만이 되면 해당 모드는 장착 불가.</p>
          `
        )}
      </div>
    `
  },
  {
    eyebrow: "03. Mod Attachment System",
    title: "3-3. 극성 매칭 규칙 / 3-4. 장착 규칙 (Validation)",
    html: `
      <div class="grid-2">
        <div>
          ${table(
            ["조건", "실제 소모 계산", "예시 <br>(소모량: 14)"],
            [
              ["극성 일치", "⌈소모량 × 0.5⌉", "⌈14 × 0.5⌉ = 7"],
              ["극성 불일치", "⌈소모량 × 1.25⌉", "⌈14 × 1.25⌉ = 18"],
              ["슬롯 극성 없음", "소모량 유지", "14"],
              ["모드 극성 없음", "소모량 유지", "14"]
            ]
          )}
        </div>

        ${card(
          "",
          `
            <p>*alert 메세지</p>
            <p>1. EquipType 일치 여부 — "이 모드는 해당 장비에 장착할 수 없습니다"</p>
            <p>2. SlotType 일치 여부 — "이 슬롯에 장착할 수 없는 모드입니다"</p>
            <p>3. 동일 ModID 중복 여부 — "같은 모드를 두 번 장착할 수 없습니다"</p>
            <p>4. ConflictGroup 중복 여부 — "충돌하는 모드가 이미 장착되어 있습니다"</p>
            <p>5. 잔여 수용량 충분 여부 — "수용량이 부족합니다"</p>
            <p>6. 엑실러스 슬롯 해금 여부 — "엑실러스 어댑터로 슬롯을 먼저 해금하세요"</p>
            <p>모든 검증 통과 시 장착 완료. 장착/해제는 자유롭고 비용이 들지 않는다.</p>
          `
        )}
      </div>
    `
  },
  {
    eyebrow: "UI WireFrame",
    title: "모드 장착 화면 (전체 레이아웃)",
    html: `
      <div class="ui-layout">
        ${asset(
          "모드 장착 화면 (전체 레이아웃)",
          "(역기획서) 워프레임 MOD 시스템-UI.pdf / p.6",
          "",
          modLoadoutWireframe()
        )}
      </div>
    `
  },
  {
    eyebrow: "UI WireFrame",
    title: "모드 장착: 슬롯 선택 프리뷰",
    className: "ui-state-slide",
    html: `
      <div class="ui-layout">
        <div class="asset">
          ${modSlotPreviewWireframe()}
        </div>
      </div>
    `
  },
  {
    eyebrow: "UI WireFrame",
    title: "에러 상태: 수용량 초과",
    className: "ui-state-slide",
    html: `
      <div class="ui-layout">
        <div class="asset">
          ${modCapacityErrorWireframe()}
        </div>
      </div>
    `
  },
  {
    eyebrow: "04. 합성 시스템 (Fusion System)",
    title: "4-1. 합성 규칙 / 4-2. 비용 공식",
    html: `
      <div class="grid-2">
        ${card(
          "",
          `
            <p>
              합성은 모드의 랭크를 올려 효과를 강화하는 시스템이다.
              재화는 엔도(Endo)와 크레딧(Credits) 두 가지를 소비한다.
            </p>
            <p>전제 조건: 대상 모드의 현재 랭크 &lt; MaxRank</p>
            <p>합성 불가 조건: 엔도 부족, 크레딧 부족, 이미 MaxRank 도달</p>
          `
        )}

        <div>
          <div class="formula">
            엔도 비용 (Rank N→N+1) = EndoBaseCost × 2^N
          </div>

          <div class="formula">
            크레딧 비용 (Rank N→N+1) = CreditBaseCost × 2^N
          </div>

          ${table(
            ["희귀도", "EndoBaseCost", "CreditBaseCost"],
            [
              ["일반", "10", "483"],
              ["고급", "20", "966"],
              ["희귀", "30", "1,449"],
              ["전설", "40", "1,932"]
            ]
          )}
        </div>
      </div>
    `
  },
  {
    eyebrow: "04. 합성 시스템 (Fusion System)",
    title: "4-3. 누적 비용 테이블 (Rank 0 → 목표 Rank)",
    html: `
      <div class="grid-2">
        <div>
          <h3>일반 모드 (EndoBase 10, CreditBase 483)</h3>

          ${table(
            ["목표 Rank", "누적 엔도", "누적 크레딧"],
            [
              ["1", "10", "483"],
              ["2", "30", "1,449"],
              ["3", "70", "3,381"],
              ["4", "150", "7,245"],
              ["5", "310", "14,973"],
              ["6", "630", "30,429"],
              ["7", "1,270", "61,341"],
              ["8", "2,550", "123,165"],
              ["9", "5,110", "246,813"],
              ["10", "10,230", "494,109"]
            ]
          )}
        </div>

        <div>
          <h3>전설 모드 (EndoBase 40, CreditBase 1,932)</h3>

          ${table(
            ["목표 Rank", "누적 엔도", "누적 크레딧"],
            [
              ["5", "1,240", "59,892"],
              ["10", "40,920", "1,976,436"]
            ]
          )}
        </div>
      </div>
    `
  },
  
{
  eyebrow: "UI WireFrame",
  title: "모드 합성: 목표 랭크 선택",
  className: "ui-state-slide fusion-slide",
  html: `
    <div class="ui-layout">
      <div class="asset">
        ${modFusionWireframe()}
      </div>
    </div>
  `
},
{
  eyebrow: "UI WireFrame",
  title: "모드 합성: 실행 확인",
  className: "ui-state-slide fusion-slide",
  html: `
    <div class="ui-layout">
      <div class="asset">
        ${modFusionConfirmWireframe()}
      </div>
    </div>
  `
},
{
  eyebrow: "UI WireFrame",
  title: "모드 합성: 결과",
  className: "ui-state-slide fusion-slide",
  html: `
    <div class="ui-layout">
      <div class="asset">
        ${modFusionResultWireframe()}
      </div>
    </div>
  `
},




  {
    eyebrow: "05. 변환 시스템 (Transmutation System)",
    title: "5-1. 변환 규칙",
    html: `
      <div class="grid-2">
        ${card(
          "",
          `
            <p>
              4장의 모드(중복 가능)를 소비하여 랜덤한 새 모드 1장을 생성한다.
            </p>
            <p>
              투입 조건: 정확히 4장의 모드를 선택해야 하며,
              각 모드는 Rank 0이어야 한다.
            </p>
            <p>
              다음 유형은 투입 불가:
              오라, 스탠스, 커럽티드, 리벤, 아말감, 갈바나이즈드,
              프라임드, 움브라, 희생 모드.
            </p>
            <p>동일 ModID 중복 투입은 가능하다.</p>
            <p>
              결과 모드의 장비 유형, 극성은 투입 모드들의 유형/극성에
              가중치를 받음.
            </p>
            <p>결과는 비가역적(롤백 불가)이다.</p>
          `
        )}

        <div>
          <h3>비용</h3>

          ${table(
            ["투입 모드 희귀도", "크레딧 비용 (장당)"],
            [
              ["일반", "3,000"],
              ["고급", "6,000"],
              ["희귀", "9,000"],
              ["전설", "12,000"]
            ]
          )}

          <p class="note">
            총 비용 = 4장 각각의 비용 합산
          </p>
        </div>
      </div>
    `
  },
  {
    eyebrow: "05. 변환 시스템 (Transmutation System)",
    title: "5-2. 변환 코어 / 변환 UI",
    html: `
      <div class="ui-layout">
        ${asset(
          "변환(Transmutation) 화면: 전체 레이아웃 / 변환 결과: 애니메이션 & 획득",
          "(역기획서) 워프레임 MOD 시스템-UI.pdf / p.11–12"
        )}

        <div class="ui-copy">
          ${card(
            "모드 대체",
            "<p>4장 중 1슬롯을 코어로 채움 (모드 3장 + 코어 1개)</p>"
          )}

          ${card(
            "극성 고정",
            "<p>결과 모드의 극성을 코어의 극성으로 확정</p>"
          )}

          ${card(
            "비용 면제",
            "<p>코어가 차지하는 슬롯의 크레딧 비용 0</p>"
          )}

          ${card(
            "인터랙 션",
            "<p>모드 클릭 → 빈 슬롯에 배치. 슬롯 클릭 → 모드 제거. [변환 실행] → 결과 화면(Slide 07).</p>"
          )}
        </div>
      </div>
    `
  },
  {
    eyebrow: "06. 포르마 시스템 (Forma System)",
    title: "6-1. 포르마 규칙 / 포르마 UI",
    html: `
      <div class="ui-layout">
        ${asset(
          "포르마 극성 부여: 슬롯 선택 / 포르마: 극성 선택 & 적용 경고",
          "(역기획서) 워프레임 MOD 시스템-UI.pdf / p.13–14"
        )}

        <div class="ui-copy">
          ${card(
            "",
            "<p>포르마는 장비 슬롯의 극성을 원하는 것으로 변경하는 소모 아이템이다.</p>"
          )}

          ${card(
            "",
            "<p>대상 장비의 레벨이 30(만렙)이어야 하며, 포르마 아이템을 1개 이상 보유해야 한다.</p>"
          )}

          ${card(
            "",
            "<p>선택한 슬롯의 극성이 지정한 극성으로 변경된다. 장비 레벨이 0으로 리셋되지만, 오로킨 카탈리스트/리액터 효과는 유지된다. 기존 장착 모드는 모두 해제된다.</p>"
          )}

          ${card(
            "",
            "<p>동일 장비에 포르마 사용 횟수 제한은 없다.</p>"
          )}

          ${card(
            "",
            "<p>특수 포르마: 움브라 포르마(움브라 극성 전용), 오라 포르마(오라 슬롯 공용 극성), 스탠스 포르마(스탠스 슬롯 공용 극성)</p>"
          )}
        </div>
      </div>
    `
  },
  {
    eyebrow: "07. Special Mods",
    title: "특수 모드(1)",
    html: `
      <div class="grid-3">
        ${card(
          "7-1. 리벤 모드 (Riven Mod)",
          `
            <p>리벤 모드는 특정 무기에 귀속되는 랜덤 능력치 모드이다.</p>
            <p>획득 시 봉인 상태이며, 모드에 표시된 게임 내 도전 과제를 완료해야 속성이 해금된다.</p>
            <p>해금 후 무기 이름이 모드에 귀속되고, 2~3개의 보너스 스탯과 0~1개의 페널티 스탯이 랜덤 부여된다.</p>
            <p>쿠바(Kuva)를 소비하여 스탯을 리롤할 수 있다.</p>
          `
        )}

        ${card(
          "7-2. 세트 모드 (Set Mod)",
          `
            <p>세트 모드는 같은 세트에 속하는 모드를 여러 장비에 걸쳐 장착할 때 추가 세트 보너스가 발동되는 모드이다.</p>
            <p>세트 보너스는 해당 세트 모드를 장착한 장비가 아니라 워프레임 자체에 적용된다.</p>
            <p>세트 카운트는 로드아웃 전체(워프레임+무기+동반자)에서 합산된다.</p>
          `
        )}

        ${card(
          "7-3. 갈바나이즈드 모드 (Galvanized Mod)",
          `
            <p>Steel Path(강철의 길) 콘텐츠에서 획득하는 아르비터 크레딧으로 구매하는 모드이다.</p>
            <p>기본 효과는 일반 모드보다 낮지만, 적 처치 시 스택이 쌓이며(최대 3~5스택), 스택당 효과가 대폭 증가한다.</p>
            <p>일반 버전 모드와 ConflictGroup이 같아 동시 장착 불가이다.</p>
          `
        )}
      </div>
    `
  },
  {
    eyebrow: "07. Special Mods",
    title: "특수 모드(2)",
    html: `
      <div class="grid-4">
        ${card(
          "프라임드 모드",
          "<p>프라임드 모드는 일반 모드의 상위 버전. MaxRank이 10으로 높고 최종 효과도 더 크다.</p>"
        )}

        ${card(
          "움브라 모드 / 희생 모드",
          "<p>움브라 모드는 기존 모드의 더욱 발전된 버전이며, 함께 장착 시 세트 보너스로 효과가 증가한다.</p>"
        )}

        ${card(
          "커럽티드 모드",
          "<p>하나의 능력치를 크게 올리는 대신 다른 능력치를 깎는 양날의 검 구조이다. 빌드 최적화의 핵심 모드군이다.</p>"
        )}

        ${card(
          "나이트메어 모드",
          "<p>나이트메어 미션 보상으로 획득되며, 두 가지 다른 능력치를 동시에 향상시키는 것이 특징이다.</p>"
        )}

        ${card(
          "개조 모드",
          "<p>신디케이트와의 서약을 통해 획득하는 모드로, 특정 워프레임 어빌리티의 작동 방식을 근본적으로 변경한다.</p>"
        )}

        ${card(
          "아말감 모드",
          "<p>일반 모드의 변형으로, 주 효과가 약간 낮은 대신 부가 효과(이동속도 증가, 반동 감소 등)가 추가된다.</p>"
        )}
      </div>
    `
  },
  {
    eyebrow: "08. Art Resources",
    title: "아트 리소스 목록",
    html: `
      <div class="grid-3">
        ${card(
          "8-1. 모드 카드 비주얼",
          `
            <p>카드 테두리 — 희귀도별 색상 프레임 (동색, 은색, 금색, 백금, 보라, 특수)</p>
            <p>카드 배경 — 기본 배경 텍스처</p>
            <p>모드 아이콘 — 개별 모드 고유 아이콘</p>
            <p>랭크 표시 도트 — 카드 하단 랭크 인디케이터 (최대 10개)</p>
            <p>극성 심볼 — 마두라이, 바자린, 나라몬, 제누릭, 우나이루, 펜자가, 움브라 + 없음</p>
          `
        )}

        ${card(
          "8-2. UI 아이콘",
          `
            <p>엔도 아이콘 / 크레딧 아이콘 / 포르마 아이콘 / 카탈리스트 아이콘 / 리액터 아이콘</p>
            <p>엑실러스 어댑터 아이콘 / 수용량 게이지 / 잠금 슬롯 아이콘</p>
            <p>합성 버튼 아이콘 / 변환 버튼 아이콘</p>
          `
        )}

        ${card(
          "8-3. 이펙트/애니메이션",
          `
            <p>합성 성공 이펙트 — 카드 발광 + 랭크 도트 점등</p>
            <p>변환 연출 — 4장 소멸 → 1장 생성 카드 플립</p>
            <p>포르마 적용 연출 — 극성 심볼 변경 트랜지션</p>
            <p>모드 장착 SFX / 모드 해제 SFX</p>
          `
        )}
      </div>
    `
  },
  {
    eyebrow: "09. Localization",
    title: "로컬라이제이션 스트링 테이블",
    html: `
      <div class="grid-3">
        ${card(
          "9-1. 메인 UI 텍스트",
          `
            <p>UI_MOD_TITLE — 모드</p>
            <p>UI_MOD_CAPACITY — 수용량</p>
            <p>UI_MOD_DRAIN — 소모</p>
            <p>UI_MOD_RANK — 랭크</p>
            <p>UI_MOD_POLARITY — 극성</p>
            <p>UI_MOD_EQUIP — 장착</p>
            <p>UI_MOD_UNEQUIP — 해제</p>
            <p>UI_FUSION_TITLE — 합성</p>
            <p>UI_TRANSMUTE_TITLE — 변환</p>
            <p>UI_FORMA_TITLE — 극성 부여</p>
          `
        )}

        ${card(
          "9-2. 알림/토스트 메시지",
          `
            <p>TOAST_EQUIP_SUCCESS — 모드가 장착되었습니다</p>
            <p>TOAST_UNEQUIP_SUCCESS — 모드가 해제되었습니다</p>
            <p>TOAST_EQUIP_DUPLICATE — 같은 모드를 두 번 장착할 수 없습니다</p>
            <p>TOAST_EQUIP_CONFLICT — 충돌하는 모드가 이미 장착되어 있습니다</p>
            <p>TOAST_EQUIP_CAPACITY — 수용량이 부족합니다</p>
            <p>TOAST_EQUIP_TYPE — 이 모드는 해당 장비에 장착할 수 없습니다</p>
            <p>TOAST_EQUIP_SLOT — 이 슬롯에 장착할 수 없는 모드입니다</p>
          `
        )}

        ${card(
          "확인 팝업",
          `
            <p>TOAST_FUSION_SUCCESS — 합성이 완료되었습니다</p>
            <p>TOAST_TRANSMUTE_SUCCESS — 변환이 완료되었습니다</p>
            <p>TOAST_FORMA_SUCCESS — 극성이 변경되었습니다. 장비 레벨이 초기화됩니다</p>
            <p>POPUP_FUSION_CONFIRM — 엔도 {0}, 크레딧 {1}을 소비하여 Rank {2}로 강화합니다. 계속하시겠습니까?</p>
            <p>POPUP_TRANSMUTE_CONFIRM — 선택한 4장의 모드가 소멸됩니다. 이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?</p>
            <p>POPUP_FORMA_CONFIRM — 장비 레벨이 0으로 초기화됩니다. 계속하시겠습니까?</p>
          `
        )}
      </div>
    `
  },
  {
    eyebrow: "Verification",
    title: "실제 게임과의 차이 / 역기획 범위 — 슬롯 및 장착 구조",
    className: "verification-slide",
    html: `
      ${table(
        ["원문 위치", "실제 게임 기준", "차이 내용", "문서 반영 원칙"],
        [
          [
            "상세 p.10 / 동반자 슬롯 구조",
            "동반자는 일반 모드 슬롯 10개를 가진다.",
            "원문에는 일반 슬롯이 8개로 표기되어 있다.",
            "본문 표는 수정하지 않고 유지한다."
          ],
          [
            "상세 p.10 / 아케인",
            "아케인은 일반 모드 카드 슬롯과 구분되는 별도 강화 시스템이다.",
            "원문은 아케인 2칸을 모드 슬롯 합계에 포함한다.",
            "본문 표는 수정하지 않고 유지한다."
          ],
          [
            "상세 p.10 / UI p.13 / 엑실러스 어댑터",
            "워프레임에는 Exilus Warframe Adapter, 주·보조·근접무기에는 Exilus Weapon Adapter가 사용된다.",
            "원문은 장비 유형별 어댑터 명칭을 구분하지 않는다.",
            "본문 문구는 수정하지 않고 유지한다."
          ],
          [
            "상세 p.10 / 수용량",
            "장비의 최대 랭크와 수용량은 장비 종류 및 플레이어 조건에 따라 예외가 존재한다.",
            "원문은 장비 레벨 0~30, 최대 수용량 60을 공통 규칙으로 표기한다.",
            "본문 수치는 수정하지 않고 유지한다."
          ]
        ],
        "small"
      )}

      <p class="sources">
        검증 출처: WARFRAME Wiki — Mods / Exilus Weapon Adapter / Exilus Warframe Adapter
      </p>
    `
  },
  {
    eyebrow: "Verification",
    title: "실제 게임과의 차이 / 역기획 범위 — 변환 및 특수 모드",
    className: "verification-slide",
    html: `
      ${table(
        ["원문 위치", "실제 게임 기준", "차이 내용", "문서 반영 원칙"],
        [
          [
            "상세 p.13~14 / UI p.11~12 / 변환 비용",
            "변환 비용은 조합된 모드의 희귀도 구성에 따라 결정된다.",
            "원문은 모드 한 장당 고정 비용을 적용한 합산 방식으로 표기한다.",
            "본문 비용 표와 UI 문구는 수정하지 않고 유지한다."
          ],
          [
            "상세 p.14 / 변환 코어",
            "변환 코어를 사용하면 3개의 모드와 코어로 변환하며, 변환 비용은 0이다.",
            "원문은 코어가 차지한 슬롯의 비용만 0으로 표기한다.",
            "본문 문구는 수정하지 않고 유지한다."
          ],
          [
            "상세 p.13 / 변환 불가 유형",
            "실제 변환 가능 여부에는 예외와 별도 변환 규칙이 존재한다.",
            "원문의 변환 불가 목록은 현재 게임의 전체 규칙과 일치하지 않는 항목이 있다.",
            "본문 목록은 수정하지 않고 유지한다."
          ],
          [
            "상세 p.15 / 갈바나이즈드 모드",
            "갈바나이즈드 모드는 릴레이의 Arbitrations Honors에서 Vitus Essence로 구매한다.",
            "원문은 Steel Path 콘텐츠에서 획득하는 아르비터 크레딧으로 구매한다고 표기한다.",
            "본문 획득처 문구는 수정하지 않고 유지한다."
          ]
        ],
        "small"
      )}

      <p class="sources">
        검증 출처: WARFRAME Wiki — Transmutation / Galvanized Mods / Mods
      </p>
    `
  },
  {
    eyebrow: "Verification",
    title: "실제 게임과의 차이 / 역기획 범위 — 포르마 및 데이터 범위",
    className: "verification-slide",
    html: `
      ${table(
        ["원문 위치", "실제 게임 기준", "차이 내용", "문서 반영 원칙"],
        [
          [
            "상세 p.15 / UI p.13 / 오라 슬롯",
            "일반 포르마로 오라 슬롯에 특정 극성을 부여할 수 있으며, 오라 포르마는 모든 극성과 호환되는 공용 극성을 부여한다.",
            "상세 문서와 UI 문서의 오라 포르마 조건이 서로 다르게 읽힌다.",
            "양쪽 원문을 수정하지 않고 유지한다."
          ],
          [
            "상세 p.4~5 / 효과 계산 공식",
            "실제 모드의 효과 증가 방식은 모드별로 다를 수 있다.",
            "원문은 BaseEffect와 EffectPerRank 기반의 선형 증가 공식으로 공통화한다.",
            "원문 공식을 데이터 설계 범위로 유지한다."
          ],
          [
            "상세 p.4~7 / EquipType",
            "실제 모드의 장착 가능 조건은 장비 대분류 외에도 무기군, 특정 장비, 특정 변형 등으로 세분화된다.",
            "원문의 EquipType은 워프레임·주무기·보조무기·근접무기 등의 대분류를 중심으로 한다.",
            "원문 Enum은 역기획 범위의 단순화된 데이터 구조로 유지한다."
          ],
          [
            "상세 p.5~6 / Rarity",
            "현재 게임에는 원문에 포함되지 않은 모드 분류와 예외가 존재한다.",
            "원문 Rarity Enum은 문서에서 다루는 모드군을 중심으로 구성되어 있다.",
            "원문 Enum은 수정하지 않고 유지한다."
          ]
        ],
        "small"
      )}

      <p class="sources">
        검증 출처: WARFRAME Wiki — Polarity / Aura / Aura Forma / Fusion<br>
        WARFRAME Support — Mod Guide: Use / Fusion / Transmutation / Sale
      </p>
    `
  }
];

/* =========================================================
   4. App (엔진 및 이벤트 바인딩)
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  const slides = Array.isArray(window.slides) ? window.slides : [];
  const deck = document.getElementById("deck");
  let currentSlide = 0;

  function drawModGuideLines() {
    document.querySelectorAll(".wf-mod-guide").forEach(function (guide) {
      const svg = guide.querySelector(".wf-guide-lines");
      if (!svg) return;
      const guideRect = guide.getBoundingClientRect();
      if (!guideRect.width || !guideRect.height) return;

      const width = guideRect.width;
      const height = guideRect.height;
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      svg.setAttribute("width", width);
      svg.setAttribute("height", height);

      let svgMarkup = "";
      guide.querySelectorAll("[data-guide-for]").forEach(function (note) {
        const targetName = note.dataset.guideFor;
        const target = guide.querySelector(`[data-guide-target="${targetName}"]`);
        if (!target) return;

        const noteRect = note.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const noteIsLeft = noteRect.left + noteRect.width / 2 < targetRect.left + targetRect.width / 2;

        const startX = noteIsLeft ? noteRect.right - guideRect.left : noteRect.left - guideRect.left;
        const startY = noteRect.top + noteRect.height / 2 - guideRect.top;
        const endX = targetRect.left + targetRect.width / 2 - guideRect.left;
        const endY = targetRect.top + targetRect.height / 2 - guideRect.top;

        const middleX = noteIsLeft
          ? startX + Math.max(34, (endX - startX) * 0.48)
          : startX - Math.max(34, (startX - endX) * 0.48);

        svgMarkup += `
          <path d="M ${startX} ${startY} L ${middleX} ${startY} L ${endX} ${endY}"></path>
          <circle cx="${endX}" cy="${endY}" r="3"></circle>
        `;
      });
      svg.innerHTML = svgMarkup;
    });
  }

  function drawLoadoutGuideLines() {
    document.querySelectorAll(".wf-loadout-guide").forEach(function (guide) {
      const svg = guide.querySelector(".wf-loadout-guide-lines");
      if (!svg) return;
      const guideRect = guide.getBoundingClientRect();
      if (!guideRect.width || !guideRect.height) return;

      const width = guideRect.width;
      const height = guideRect.height;
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      svg.setAttribute("width", width);
      svg.setAttribute("height", height);
      svg.setAttribute("preserveAspectRatio", "none");

      let svgMarkup = "";
      guide.querySelectorAll("[data-loadout-guide-for]").forEach(function (note) {
        const targetName = note.dataset.loadoutGuideFor;
        const target = guide.querySelector(`[data-loadout-target="${targetName}"]`);
        if (!target) return;

        const noteRect = note.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        const startX = targetRect.right - guideRect.left;
        const startY = targetRect.top + Math.min(targetRect.height * 0.35, 18) - guideRect.top;
        const endX = noteRect.left - guideRect.left;
        const endY = noteRect.top + noteRect.height / 2 - guideRect.top;
        const middleX = startX + Math.max(24, (endX - startX) * 0.42);

        svgMarkup += `
          <path d="M ${startX} ${startY} L ${middleX} ${startY} L ${middleX} ${endY} L ${endX} ${endY}"></path>
          <circle cx="${startX}" cy="${startY}" r="3"></circle>
        `;
      });
      svg.innerHTML = svgMarkup;
    });
  }

  function drawStateGuideLines() {
    document.querySelectorAll(".wf-state-screen").forEach(function (screen) {
      const svg = screen.querySelector(".wf-state-guide-lines");
      if (!svg) return;
      const screenRect = screen.getBoundingClientRect();
      if (!screenRect.width || !screenRect.height) return;

      svg.setAttribute("viewBox", `0 0 ${screenRect.width} ${screenRect.height}`);
      svg.setAttribute("width", screenRect.width);
      svg.setAttribute("height", screenRect.height);

      let svgMarkup = "";
      screen.querySelectorAll("[data-state-guide-for]").forEach(function (note) {
        const targetName = note.dataset.stateGuideFor;
        const target = screen.querySelector(`[data-state-guide-target="${targetName}"]`);
        if (!target) return;

        const noteRect = note.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        const startX = targetRect.left + targetRect.width / 2 - screenRect.left;
        const startY = targetRect.bottom - screenRect.top;
        const endX = noteRect.left - screenRect.left;
        const endY = noteRect.top + noteRect.height / 2 - screenRect.top;
        const middleY = startY + Math.max(18, (endY - startY) * 0.45);

        svgMarkup += `
          <path d="M ${startX} ${startY} L ${startX} ${middleY} L ${endX} ${middleY} L ${endX} ${endY}"></path>
          <circle cx="${startX}" cy="${startY}" r="3"></circle>
        `;
      });
      svg.innerHTML = svgMarkup;
    });
  }

  function redrawGuideLines() {
    requestAnimationFrame(function () {
      drawModGuideLines();
      drawLoadoutGuideLines();
      drawStateGuideLines();
    });
  }

  function renderSlides() {
    if (!deck) return;
    if (!slides.length) return;

    deck.innerHTML = slides
      .map(function (slide, index) {
        return `
          <section class="slide ${index === currentSlide ? "active" : ""} ${slide.className || ""}">
            ${slide.eyebrow ? `<p class="eyebrow">${slide.eyebrow}</p>` : ""}
            ${slide.title ? `<h2>${slide.title}</h2>` : ""}

            <div class="slide-body">
              ${slide.html || ""}
            </div>

            <p class="page page-num num">
              ${String(index + 1).padStart(2, "0")} /
              ${String(slides.length).padStart(2, "0")}
            </p>
          </section>
        `;
      })
      .join("");

    redrawGuideLines();
  }

  function showSlide(index) {
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;

    document.querySelectorAll(".slide").forEach(function (slide, slideIndex) {
      slide.classList.toggle("active", slideIndex === currentSlide);
    });

    redrawGuideLines();
  }

  const previousButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  if (previousButton) {
    previousButton.addEventListener("click", function () {
      showSlide(currentSlide - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      showSlide(currentSlide + 1);
    });
  }

  window.addEventListener("keydown", function (event) {
    if (["ArrowRight", " ", "PageDown"].includes(event.key)) {
      event.preventDefault();
      showSlide(currentSlide + 1);
    }
    if (["ArrowLeft", "PageUp"].includes(event.key)) {
      event.preventDefault();
      showSlide(currentSlide - 1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      showSlide(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      showSlide(slides.length - 1);
    }
  });

  window.addEventListener("resize", function () {
    redrawGuideLines();
  });

  renderSlides();
});
