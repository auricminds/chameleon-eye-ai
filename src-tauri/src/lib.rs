//! Chameleon Eye AI — Tauri desktop shell
//!
//! SECURITY: This desktop app must NEVER contain master API keys, OpenRouter keys,
//! or Supabase service keys. Authentication will use login, device activation, or
//! short-lived tokens via the Chameleon Eye backend (future).
//!
//! Future flow:
//! Desktop App → Chameleon Eye Backend → Business DNA → Privacy Rules → OpenRouter → Report

use tauri::menu::{Menu, MenuItem, PredefinedMenuItem, Submenu};
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            let file_menu = Submenu::with_items(
                app,
                "Chameleon Eye AI",
                true,
                &[
                    &MenuItem::with_id(app, "new_session", "New Terminal Session", true, None::<&str>)?,
                    &MenuItem::with_id(app, "archive", "Archive", true, None::<&str>)?,
                    &MenuItem::with_id(app, "business_dna", "Business DNA", true, None::<&str>)?,
                    &PredefinedMenuItem::separator(app)?,
                    &PredefinedMenuItem::quit(app, None)?,
                ],
            )?;

            let view_menu = Submenu::with_items(
                app,
                "View",
                true,
                &[&MenuItem::with_id(app, "reload", "Reload", true, None::<&str>)?],
            )?;

            let menu = Menu::with_items(app, &[&file_menu, &view_menu])?;
            app.set_menu(menu)?;
            Ok(())
        })
        .on_menu_event(|app, event| {
            let Some(window) = app.get_webview_window("main") else {
                return;
            };
            let base = if cfg!(debug_assertions) {
                "http://localhost:3001"
            } else {
                "https://chameleoneye.ai"
            };
            match event.id().as_ref() {
                "new_session" => {
                    let _ = window.navigate(format!("{base}/terminal").parse().unwrap());
                }
                "archive" => {
                    let _ = window.navigate(format!("{base}/archive").parse().unwrap());
                }
                "business_dna" => {
                    let _ = window.navigate(format!("{base}/settings/business-dna").parse().unwrap());
                }
                "reload" => {
                    let _ = window.eval("window.location.reload()");
                }
                _ => {}
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
