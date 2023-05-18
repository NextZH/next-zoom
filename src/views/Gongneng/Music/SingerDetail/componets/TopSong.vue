<template>
  <el-table :data="song.list" style="width: 100% " stripe>
    <el-table-column show-overflow-tooltip width="80" label="播放">
      <template #default="{ row, $index }">
        <el-icon :size="22" @click="playMusic(row, $index)">
          <VideoPause v-if="row.playFlag" />
          <VideoPlay v-else />
        </el-icon>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="name" label="歌曲" />
    <el-table-column show-overflow-tooltip prop="al.name" label="专辑" />
    <el-table-column show-overflow-tooltip prop="dt" label="时长" width="100" :formatter="formatter" />
  </el-table>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { getArtistTopSong } from '@/api/wangyiyun';
import { useMusicStore } from '@/stores/Music';
import { VideoPlay, VideoPause } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
const musicStore = useMusicStore();
const { musicChange } = musicStore;
const { music, playFlag, musicAudio, musicIndex } = storeToRefs(musicStore);
const props = defineProps(['singerId']);

watch(playFlag, (value: any) => {
  if (value) {
    song.list.forEach((e: any) => {
      if (e.id == music.value.currentMusic.id) {
        e.playFlag = true;
      }
    })
  } else {
    song.list.forEach((e: any) => {
      e.playFlag = false;
    })
  }
})

//播放暂停音乐
const playMusic = async (row: any, index: number) => {
  const playNewSong = async () => {
    song.list.forEach((e: any) => {
      e.playFlag = false
    });
    if (music.value.listId != props.singerId) {
      music.value.listId = props.singerId;
      music.value.list = song.list.map((e: any) => ({ ...e, artists: e.ar }));
      music.value.musicImg = song.list.map((e: any) => e.al.picUrl);
      // musicIndex.value=index;
    }
    await musicChange(index);
    row.playFlag = true;
  }
  // console.log(row, index);
  if (!row.playFlag) {
    if (playFlag.value) {
      playNewSong();
    } else {
      if (row.id == music.value.currentMusic.id) {
        row.playFlag = true;
        playFlag.value = true;
        (musicAudio.value as any).play();
      } else {
        playNewSong();
      }
    }
  } else {
    row.playFlag = false;
    playFlag.value = false;
    (musicAudio.value as any).pause();
  }

  // playFlag.value = !playFlag.value;
  // if (playFlag.value) {
  //   (musicAudio.value as any).play();
  // } else {
  //   (musicAudio.value as any).pause();
  // }
}


const song: any = reactive([]);
const getArtistTopSongAsync = async () => {
  const res = await getArtistTopSong({ id: Number(props.singerId!) });
  song.list = res.songs.map((e: any) => ({ ...e, playFlag: false }));
  // console.log('getArtistTopSong', res);
}

const formatter = (row: any, column: any, cellValue: any, index: number) => {
  // console.log(row);
  const m = Math.floor(row.dt / 60000);
  const s = Math.floor(row.dt / 1000) % 60;
  return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
}


const init = async () => {
  await getArtistTopSongAsync();
  if (playFlag.value) {
    if (music.value.listId == props.singerId) {
      song.list.forEach((e: any) => {
        if (e.id == music.value.currentMusic.id) {
          e.playFlag = true;
        }
      })
    }
  }
}

/* created */
(async () => {
  init();
})();
</script>

<style scoped>
.el-icon {
  cursor: pointer;
}
</style>