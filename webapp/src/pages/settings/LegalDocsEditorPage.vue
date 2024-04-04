<template>
  <q-page class="full-height" style=" color: white;">
    <div class="row settingsbox">
      <div class="col-md-4 col-xs-12 gt-sm">
        <settings-menu-component>

        </settings-menu-component>
      </div>
      <div class="col-md-1 col-xs-12 gt-sm" style="height: 10px;"></div>
      <div class="col-md-7 col-xs-12">
        <q-card style=" color: #232524;">
          <q-card-section>
            <q-list>
              <q-item class="lt-md" style="padding-left: 0px;">
                <q-btn to="/settings" no-caps flat icon="fa-solid fa-arrow-left" label="Settings"></q-btn>
                <q-space />
                <q-item-section side>
                  <p class="text-subtitle1">Legal Document Editor</p>
                </q-item-section>
              </q-item>
              <q-separator class="lt-md" />
              <q-item>
                <q-splitter v-model="splitterModel" style="height: 90vh; width: 100%">
                  <template v-slot:before>
                    <q-tree :nodes="docTree" v-model:selected="selectedDoc" node-key="value">
                      <template v-slot:header-generic="prop">
                        <div class="row items-center">
                          <div class="text-weight-bold text-primary">{{ prop.node.label }}</div>
                        </div>
                      </template>
                      <template v-slot:header-add="prop">
                        <div class="row items-center">
                          <div class="text-weight-bold">{{ prop.node.label }}</div>
                          <q-icon :name="'add'" size="18px" class="q-mr-sm" />
                        </div>
                      </template>
                    </q-tree>
                  </template>
                  <template v-slot:after>
                    <div v-if="!loadingDocs && !addNew">
                      <q-input v-model="teditor" filled label="Document Name">
                        <template v-slot:after>
                          <q-btn flat icon="save" @click="saveDocument" />
                        </template>
                      </q-input>
                      <q-editor v-model="qeditor" :dense="$q.screen.lt.md" :toolbar="[
                  ['fullscreen', 'viewsource', 'bold', 'italic', 'strike', 'underline', 'subscript', 'superscript', 'hr', 'link', 'removeFormat', 'quote', 'unordered', 'ordered', 'outdent', 'indent'],
                  [
                    {
                      label: $q.lang.editor.formatting,
                      icon: $q.iconSet.editor.formatting,
                      list: 'no-icons',
                      options: [
                        'p',
                        'h1',
                        'h2',
                        'h3',
                        'h4',
                        'h5',
                        'h6',
                        'code'
                      ]
                    },
                    {
                      label: $q.lang.editor.fontSize,
                      icon: $q.iconSet.editor.fontSize,
                      fixedLabel: true,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'size-1',
                        'size-2',
                        'size-3',
                        'size-4',
                        'size-5',
                        'size-6',
                        'size-7'
                      ]
                    },
                    {
                      label: $q.lang.editor.align,
                      icon: $q.iconSet.editor.align,
                      fixedLabel: true,
                      options: ['left', 'center', 'right', 'justify']
                    }
                  ],
                ]" :fonts="{
                  arial: 'Arial',
                  arial_black: 'Arial Black',
                  comic_sans: 'Comic Sans MS',
                  courier_new: 'Courier New',
                  impact: 'Impact',
                  lucida_grande: 'Lucida Grande',
                  times_new_roman: 'Times New Roman',
                  verdana: 'Verdana'
                }" />
                    </div>
                    <div v-else style="width: 100%; height: 100%; position: relative;">
                      <q-spinner class="absolute-center" color="primary" size="3em" />
                    </div>

                  </template>
                </q-splitter>
              </q-item>
            </q-list>
          </q-card-section>
          <q-separator inset />
        </q-card>
      </div>
    </div>
    <q-dialog v-model="addNew">
      <q-card style=" min-width: 80%">
        <q-card-section>
          <div class="text-h6">Add Document</div>
        </q-card-section>

        <q-card-section style="max-height: 80vh;" class="scroll">
          <div class="text-h5">{{ dideditor }}</div>
          <q-select v-model="rideditor" map-options emit-value
            :options="localeHolder?.regions?.map((x) => ({ label: x.name, value: x.code }))" label="Region" />
          <q-select v-model="lideditor" map-options emit-value
            :options="localeHolder?.languages?.map((x) => ({ label: x.name, value: x.code }))" label="Language" />
          <q-input v-model="teditor" filled label="Document Name" />
          <q-editor v-model="qeditor" :dense="$q.screen.lt.md" :toolbar="[
                  ['fullscreen', 'viewsource', 'bold', 'italic', 'strike', 'underline', 'subscript', 'superscript', 'hr', 'link', 'removeFormat', 'quote', 'unordered', 'ordered', 'outdent', 'indent'],
                  [
                    {
                      label: $q.lang.editor.formatting,
                      icon: $q.iconSet.editor.formatting,
                      list: 'no-icons',
                      options: [
                        'p',
                        'h1',
                        'h2',
                        'h3',
                        'h4',
                        'h5',
                        'h6',
                        'code'
                      ]
                    },
                    {
                      label: $q.lang.editor.fontSize,
                      icon: $q.iconSet.editor.fontSize,
                      fixedLabel: true,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'size-1',
                        'size-2',
                        'size-3',
                        'size-4',
                        'size-5',
                        'size-6',
                        'size-7'
                      ]
                    },
                    {
                      label: $q.lang.editor.align,
                      icon: $q.iconSet.editor.align,
                      fixedLabel: true,
                      options: ['left', 'center', 'right', 'justify']
                    }
                  ],
                ]" :fonts="{
                  arial: 'Arial',
                  arial_black: 'Arial Black',
                  comic_sans: 'Comic Sans MS',
                  courier_new: 'Courier New',
                  impact: 'Impact',
                  lucida_grande: 'Lucida Grande',
                  times_new_roman: 'Times New Roman',
                  verdana: 'Verdana'
                }" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Save" @click="saveDocument" color="primary" />
          <q-btn flat label="Cancel" color="black" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api, opencmsApi } from 'src/boot/axios';
import SettingsMenuComponent from 'src/components/SettingsMenuComponent.vue';
import { watch } from 'vue';
import { validateLocaleAndSetLanguage } from 'typescript';
import { open } from 'inspector';

interface CMSProject {
  id: string;
  name: string;
  documentIds: string[];
  documentPreview: any;
}

interface LocaleItem {
  name: string;
  code: string;
}

interface LocaleHolder {
  regions: LocaleItem[];
  languages: LocaleItem[];
}

const projectId = 'adba08f9-84d8-485d-9511-5cc767f3e18f';

export default defineComponent({
  name: 'LegalDocsEditorPage',
  components: { SettingsMenuComponent },
  methods: {
    saveDocument() {
      console.log('Save document');
      this.addNew = false;
      opencmsApi.put(`/projects/${projectId}/documents/${this.dideditor}/${this.rideditor}/${this.lideditor}`, {
        name: this.teditor,
        content: this.qeditor,
      }).then((response) => {
        console.log(response.data);
      });
    },
  },
  mounted() {
    opencmsApi.get(`/projects/${projectId}/preview`).then((response) => {
      this.project = response.data;
      const docIds = response.data.documentIds;
      const tree: any[] = [];

      docIds.forEach((docId) => {
        const regionTree: any[] = [];
        const regions = Object.keys(this.project?.documentPreview[docId]);
        regions.forEach((region) => {
          const langTree: any[] = [];
          const langs = Object.keys(this.project?.documentPreview[docId][region]);
          langs.forEach((lang) => {
            langTree.push({
              selectable: true,
              label: lang,
              value: `${docId}/${region}/${lang}`,
            });
          });
          langTree.push({
            selectable: true,
            label: 'New Language',
            value: `add/${docId}/${region}`,
            header: 'add'
          });
          regionTree.push({
            selectable: false,
            label: region,
            children: langTree,
            value: `${docId}/${region}`,
            header: 'generic',
          });
        });
        regionTree.push({
          selectable: true,
          label: 'New Region',
          value: `add/${docId}`,
          header: 'add'
        });
        tree.push({
          selectable: false,
          label: docId,
          children: regionTree,
          value: docId,
          header: 'generic',
        });
      });

      this.docTree = tree;
    });
    opencmsApi.get('/locales').then((response) => {
      this.localeHolder = response.data;
    });
  },
  setup() {
    const legalDocs = ref([]);
    const project = ref<CMSProject | null>(null);
    const qeditor = ref('');
    const teditor = ref('');
    const dideditor = ref('');
    const rideditor = ref('');
    const lideditor = ref('');
    const selectedDoc = ref('');
    const loadingDocs = ref(false);
    const addNew = ref(false);
    const localeHolder = ref<LocaleHolder | null>(null);
    const docTree = ref<any[]>([
      {
        label: 'Loading...',
        selectable: false
      },
    ]);

    watch(selectedDoc, (newVal) => {
      if (!newVal) return;
      if (newVal.startsWith('add')) {
        console.log('Add new document');
        const parts = newVal.split('/');
        dideditor.value = parts[1];
        if (parts.length === 3) {
          console.log('Add new language');
          console.log(parts[1], parts[2]);
          rideditor.value = parts[2];
          lideditor.value = '';
        } else {
          console.log('Add new region');
          console.log(parts[1]);
          rideditor.value = '';
          lideditor.value = '';
        }
        qeditor.value = '';
        teditor.value = '';
        addNew.value = true;
        return;
      }

      console.log(newVal);
      loadingDocs.value = true;
      opencmsApi.get(`/projects/${projectId}/documents/${newVal}`).then((response) => {
        qeditor.value = response.data.content;
        teditor.value = response.data.name;
        const parts = newVal.split('/');
        dideditor.value = parts[0];
        rideditor.value = parts[1];
        lideditor.value = parts[2];
        loadingDocs.value = false;
      });
    });

    return { legalDocs, project, splitterModel: ref(20), selectedDoc, qeditor, teditor, loadingDocs, docTree, addNew, localeHolder, dideditor, rideditor, lideditor };
  },
});
</script>
